import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const scene = new THREE.Scene();
const controles = new OrbitControls(camera, renderer.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.03;

const peça = new THREE.BoxGeometry();
const mat  = new THREE.MeshStandardMaterial({
    color: 0xffff00,
});

const cubo = new THREE.Mesh(peça, mat);
scene.add(cubo);

const luz = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(luz);

function animate() {
  requestAnimationFrame(animate);
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.02;
  controles.update();
  renderer.render(scene, camera);
}
animate();