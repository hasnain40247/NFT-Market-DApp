import * as THREE from "three";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

export function LoadStars() {
    let scene, camera, renderer, canvas, stars;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
  var mouseX = 0, mouseY = 0;


    canvas = document.getElementById("stars");
 


    scene = new THREE.Scene();



    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;


    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    renderer.setPixelRatio(window.devicePixelRatio);


    const points = []


    for (let i = 0; i < 2000; i++) {
        let star = new THREE.Vector3(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        points.push(star);
    }
    let geometry = new THREE.BufferGeometry().setFromPoints(points)

    let sprite = new THREE.TextureLoader().load('dot.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1.7,
        map: sprite
    });
    stars = new THREE.Points(geometry, starMaterial);
    scene.add(stars);

    document.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){



        camera.aspect = (window.innerWidth)/( window.innerHeight);
        
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth,window.innerHeight*0.5 );
    
    }
    function onMouseMove( event ) {
  
      mouseX = (event.clientX - windowHalfX)
      mouseY = (event.clientY - windowHalfY)
  
  }
    const animate = () => {
        if(camera.position.x >= -300 || camera.position.x <= 299)
    camera.position.x += (-mouseX - camera.position.x) * 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}







export function LoadStarsMint() {
    let scene, camera, renderer, canvas, stars;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
  var mouseX = 0, mouseY = 0;


    canvas = document.getElementById("mintstars");
 


    scene = new THREE.Scene();



    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;


    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    const points = []


    for (let i = 0; i < 2000; i++) {
        let star = new THREE.Vector3(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        points.push(star);
    }
    let geometry = new THREE.BufferGeometry().setFromPoints(points)

    let sprite = new THREE.TextureLoader().load('dot.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1.7,
        map: sprite
    });
    stars = new THREE.Points(geometry, starMaterial);
    scene.add(stars);

    document.addEventListener( 'mousemove', onMouseMove, false );
    function onMouseMove( event ) {
  
      mouseX = (event.clientX - windowHalfX)
      mouseY = (event.clientY - windowHalfY)
  
  }
    const animate = () => {
        if(camera.position.x >= -300 || camera.position.x <= 299)
    camera.position.x += (-mouseX - camera.position.x) * 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}






