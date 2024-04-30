import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const container = document.querySelector(".arrow-box");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

camera.position.z = 5;

/* gltf */
// Instantiate a loader
const loader = new GLTFLoader();
// Load a glTF resource
loader.load(
  // resource URL
  "models/ARROW.gltf",
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);
    const model = gltf.scene;
    model.position.x = 1.5;
    model.position.y = 1;
    model.rotation.y = -0.2;

    model.scale.set(1.2, 1.2, 1.2);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

const lightHemisphere = new THREE.HemisphereLight(0xfffff7, 0x080820, 5);
scene.add(lightHemisphere);

function animate() {
  requestAnimationFrame(animate);

  // scene.rotation.y += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
