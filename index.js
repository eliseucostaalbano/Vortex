import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import spline from './spline.js';

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

const pontos = spline.getPoints(100);
const geometria = new THREE.BufferGeometry().setFromPoints(pontos);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const linha = new THREE.Line(geometria, material);
// scene.add(linha);

const tuboGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tuboMat = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide , wireframe: true });
const tubo = new THREE.Mesh(tuboGeo, tuboMat);
scene.add(tubo);

const luz = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(luz);

function animate() {
  requestAnimationFrame(animate);
  controles.update();
  renderer.render(scene, camera);
}
animate();