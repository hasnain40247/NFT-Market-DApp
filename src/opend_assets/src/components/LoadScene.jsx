import * as THREE from "three";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function LoadScene() {
  let line = 3000;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 200;

  camera.aspect = window.innerWidth / window.innerHeight;

  const canvas = document.getElementById("void");

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth * 0.99, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  const ambientLight = new THREE.AmbientLight(0x0000ff, 40);

  ambientLight.castShadow = true;
  scene.add(ambientLight);
  const points = [];

  let starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(6 * line), 3)
  );
  starGeometry.setAttribute(
    "velocity",
    new THREE.BufferAttribute(new Float32Array(2 * line), 1)
  );

  let position = starGeometry["attributes"]["position"];
  let positionArray = position["array"];
  let velocity = starGeometry["attributes"]["velocity"];
  let velocityArray = velocity["array"];
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  for (let i = 0; i < line; i++) {
    var x = Math.random() * 400 - 200;
    var y = Math.random() * 200 - 100;

    var z = Math.random() * 500 - 100;
    var xx = x;
    var yy = y;
    var zz = z;
    //line start
    positionArray[6 * i] = x;
    positionArray[6 * i + 1] = y;
    positionArray[6 * i + 2] = z;
    //line end
    positionArray[6 * i + 3] = xx;
    positionArray[6 * i + 4] = yy;
    positionArray[6 * i + 5] = zz;
    velocityArray[2 * i] = velocityArray[2 * i + 1] = 0;
  }

  let lineBasicMaterial = new THREE.LineBasicMaterial({ color: 0xadd8e6 });
  let lines = new THREE.LineSegments(starGeometry, lineBasicMaterial);
  scene.add(lines);
  document.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth * 0.99, window.innerHeight);
  }
  function onMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }
  const animate = () => {
    for (let i = 0; i < line; i++) {
      velocityArray[2 * i] += 0.03;
      velocityArray[2 * i + 1] += 0.025;
      positionArray[6 * i + 2] += velocityArray[2 * i];
      positionArray[6 * i + 5] += velocityArray[2 * i + 1];

      if (positionArray[6 * i + 5] > 200) {
        var z = Math.random() * 200 - 100;
        positionArray[6 * i + 2] = z;
        positionArray[6 * i + 5] = z;
        velocityArray[2 * i] = 0;
        velocityArray[2 * i + 1] = 0;
      }
    }
    position.needsUpdate = true;
    targetX = (1 - mouseX) * 0.0005;
    targetY = (1 - mouseY) * 0.0005;

    camera.rotation.x += 0.5 * (targetY - camera.rotation.x);
    camera.rotation.y += 0.5 * (targetX - camera.rotation.y);
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };
  animate();
}

export default LoadScene;

//     let obj;
//     const loader= new GLTFLoader()
//     console.log(loader)
//     loader.load('token.glb', gltf=>{
//         obj=gltf.scene
//         obj.name="token"
//         obj.position.x=0
//         obj.position.y=0
//         obj.receiveShadow=true
//         obj.castShadow=true
//         scene.add(obj)
//         obj.traverse(function(child){
//             if(child.isMesh){
//                 child.castShadow=true
//                 child.receiveShadow=true
//             }
//         })

//         console.log("Syuccess");

//     }, undefined , function (error){
// console.log(error);
//     })
