import React, { useEffect, useRef } from "react";
import * as THREE from "three";
const ArViewer = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    let renderer, camera, scene;
    renderer = new THREE.WebGL1Renderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const enableAr = () => {
      if (navigator.xr) {
        navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
          if (supported) {
            navigator.xr
              .requestSession("immersive-ar", {
                requiredFeatures: ["hit-test"],
              })
              .then((session) => {
                renderer.xr.setReferenceSpaceType("local");
                renderer.xr.setSession(session);

                scene.add(camera);
                const animate = () => {
                  session.requestAnimationFrame(animate);

                  // Rotate the cube
                  cube.rotation.x += 0.01;
                  cube.rotation.y += 0.01;

                  // Render the scene with the camera
                  renderer.render(scene, camera);
                };
                animate();
              });
          }
        });
      }
    };

    enableAr();

    // camera.position.z = 5;

    // Create cube geometry
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);

    // Add cube to the scene
    // scene.add(cube);

    // Animation loop
    // const animate = () => {

    // };

    // animate();

    // Clean up the scene on unmount
    return () => {
      scene.remove(camera);
      camera = null;
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default ArViewer;
