import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import spline from './spline.js';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const cena = new THREE.Scene();
cena.fog = new THREE.FogExp2(0x000000, 0.3);
const controles = new OrbitControls(camera, renderer.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.03;

// crie uma geometria de linhas usando o spline
const pontos = spline.getPoints(100);
const geometria = new THREE.BufferGeometry().setFromPoints(pontos);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const linha = new THREE.Line(geometria, material);
// cena.add(linha);

//criando a geometria do tubo do spline
const tuboGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tuboMat = new THREE.MeshBasicMaterial({ 
     color: 0x0000ff, 
    // side: THREE.DoubleSide,
    wireframe: true 
  });
const tubo = new THREE.Mesh(tuboGeo, tuboMat);
// cena.add(tubo);

//criando as bordas do tubo
const pontas = new THREE.EdgesGeometry(tuboGeo, 0.2);
const pontosMat = new THREE.LineBasicMaterial({ color: 0xC0C0C0 });
const tuboLinhas = new THREE.LineSegments(pontas, pontosMat);
cena.add(tuboLinhas);

const updateCamera = (t) => {
  const tempo = t * 0.1;
  const tempoLoop = 10 * 1000;
  const p = (tempo % tempoLoop) / tempoLoop;
  const pos = tuboGeo.parameters.path.getPointAt(p);
  const olharPara = tuboGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(olharPara);
};

function animate(t) {
  requestAnimationFrame(animate);
  updateCamera(t);
  renderer.render(cena, camera);
  controles.update();
}
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);