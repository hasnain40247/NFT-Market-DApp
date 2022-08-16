import * as THREE from "three";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

function LoadSceneDecrease() {
  let scene,
    camera,
    ambient,
    canvas,
    loader,
    cloudParticles = [];
  let clock = new THREE.Clock();
  var mouseX = 0,
    mouseY = 0;
  var start_time = Date.now();

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  canvas = document.getElementById("void22");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    2200
  );
  camera.position.z = 0;
  camera.position.y = 200;

  camera.rotation.x = 1;
  camera.rotation.y = -0.01;
  camera.rotation.z = 0;

  let renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.fog = new THREE.FogExp2(0xededed, 0.0007);
  loader = new THREE.TextureLoader();

  loader.load("cloud.png", function (texture) {
    let cloudGeometry = new THREE.PlaneBufferGeometry(500, 500);

    for (let i = 0; i < 1000; i++) {
      let cloudMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xffffff,
      });
      let cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        Math.random() * 7701 - 5200,
        Math.random() * 1401 + 600,
        -1200
      );
      cloud.rotation.x = 1;
      cloud.rotation.y = -0.01;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.scale.x = cloud.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

      cloud.material.opacity = 1;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });
  document.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = (window.innerWidth) / (window.innerHeight);

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth , window.innerHeight );
  }
  function onMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }
  const animate = () => {
    cloudParticles.forEach((e, index) => {
      e.position.y -= 0.9;

      if (e.position.y - camera.position.y <= 1100)
        e.material.opacity -= 0.0009;
      else if (
        e.position.y - camera.position.y > 1100 ||
        e.position.y - camera.position.y < 1800
      )
        e.material.opacity += 0.004;

      if (e.position.y < 410) {
        e.material.opacity = 0;
        e.position.y = Math.random() * 101 + 1900;

        e.position.needsUpdate = true;
      }
    });

    camera.position.x += (-mouseX - camera.position.x) * 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  };
  animate();
}

export default LoadSceneDecrease;

// let vShader = `
// varying vec2 vUv;

// void main() {

//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

// }
// `
// let fShader = `
// uniform sampler2D map;

// uniform vec3 fogColor;
// uniform float fogNear;
// uniform float fogFar;

// varying vec2 vUv;

// void main() {

//   float depth = gl_FragCoord.z / gl_FragCoord.w;
//   float fogFactor = smoothstep( fogNear, fogFar, depth );

//   gl_FragColor = texture2D( map, vUv );
//   gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
//   gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

// }
// `

// let clock = new THREE.Clock();

// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(
//   30,
//   window.innerWidth / window.innerHeight,
//   1,
//   3000
// );
// camera.position.z = 6000;

// let canvas = document.getElementById("void22");
// let mouseX = 0
// let mouseY = 0
// let targetX = 0
// let targetY = 0
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2

// let renderer = new THREE.WebGLRenderer({
//   canvas,
//   antialias: false,

// });
// renderer.setSize(window.innerWidth * 0.99, window.innerHeight);

// renderer.setPixelRatio(window.devicePixelRatio);

// let ambientLight = new THREE.AmbientLight(0x0000ff, 40);

// ambientLight.castShadow = true;
// scene.add(ambientLight);

// let geometry = new THREE.BufferGeometry();

// let texture = new THREE.TextureLoader().load('cloud10.png');

// texture.format = RGBAFormat;
// texture.needsUpdate = true;

// console.log(texture);

// var fog = new THREE.Fog(0x4584b4, - 100, 3000);

// let material = new THREE.ShaderMaterial({

//   uniforms: {

//       "map": { type: "t", value: texture },
//       "fogColor": { type: "c", value: fog.color },
//       "fogNear": { type: "f", value: fog.near },
//       "fogFar": { type: "f", value: fog.far },

//   },
//   vertexShader: vShader,
//   fragmentShader: fShader,
//   depthWrite: false,
//   depthTest: false,
//   transparent: true

// });

// var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));

//   for (var i = 0; i < 8000; i++) {

//       plane.position.x = Math.random() * 1000 - 500;
//       plane.position.y = - Math.random() * Math.random() * 200 - 15;
//       plane.position.z = i;
//       plane.rotation.z = Math.random() * Math.PI;
//       plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
//       plane.updateMatrix();
//       geometry.merge(plane.geometry, plane.matrix);

//   }
//   let mesh = new THREE.Mesh(geometry, material);
//   console.log(mesh);
//   scene.add(mesh);

//   let mesh2 = new THREE.Mesh(geometry, material);
//   mesh2.position.z = - 8000;
//   scene.add(mesh2);

// document.addEventListener("mousemove", onMouseMove, false);
// function onMouseMove(event) {
//   mouseX = event.clientX - windowHalfX;
//   mouseY = event.clientY - windowHalfY;
// }
// let animate = () => {
//   requestAnimationFrame(animate);
//   let elapsedTime=clock.getDelta()
//   let position = (elapsedTime * 0.03) % 8000;

//   camera.position.x += (mouseX - camera.position.x) * 0.01;
//   camera.position.y += (- mouseY - camera.position.y) * 0.01;
//   camera.position.z = - position + 8000;

//   renderer.render(scene, camera);
// };

// animate()
