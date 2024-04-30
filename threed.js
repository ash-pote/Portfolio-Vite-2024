import * as THREE from "three";
import { gsap } from "gsap";

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#scene-container");

// Create scene
const scene = new THREE.Scene();

// Change color
scene.background = new THREE.Color(0xf6f4f4);

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 4.5);

// create a geometry
const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();

const uniforms = {
  time: { value: 0 },
  cat: { value: loader.load("/img/texture.png") },
  u_intensity: { value: 0.2 },
};

const geometry2 = new THREE.IcosahedronGeometry(0.5, 60);
const material2 = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vert,
  fragmentShader: frag,
});
const cube2 = new THREE.Mesh(geometry2, material2);

scene.add(cube2);
cube2.position.set(-8.5, 3, 0);

// create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
// turn on the physically correct lighting model
renderer.physicallyCorrectLights = true;

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// Create a directional light
const light = new THREE.DirectionalLight("white", 9);
scene.add(light);
// move the light right, up, and towards us
light.position.set(8, 10, 10);

// ambient light
// const lightAmbient = new THREE.AmbientLight( 0x404040, 6 ); // soft white light
// scene.add( lightAmbient );

// hemispher light
const lightHemisphere = new THREE.HemisphereLight(0xfffff7, 0x080820, 5);
scene.add(lightHemisphere);

// point light
const lightPoint = new THREE.PointLight(0xfff4f4, 1, 100);
light.position.set(0, 0, 0);
scene.add(lightPoint);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);

// animate
const delta = clock.getDelta();

function animate() {
  requestAnimationFrame(animate);

  // update uniforms
  uniforms.time = { value: clock.getElapsedTime() * 0.1 };

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const tlThree = gsap.timeline({ repeat: -1, yoyo: true });
tlThree
  .to(cube2.position, { duration: 15, x: 8.5, y: -2 })
  .to(cube2.position, { duration: 15, x: -8.5, y: 0 });
