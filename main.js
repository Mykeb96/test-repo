
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
// import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'


// Scene Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(60);
camera.position.setY(25);

renderer.render( scene, camera );

const controls = new OrbitControls( camera, renderer.domElement );

// Loading Manager

THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  const app = document.getElementById('app')

};

THREE.DefaultLoadingManager.onLoad = function ( ) {

	console.log( 'Loading Complete!');

};


THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

THREE.DefaultLoadingManager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set( 20, 20, 20 );

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//

// Text Models
// const loader = new FontLoader();

//     loader.load('./fonts/optimer_bold.typeface.json', function ( font ) {
//         const geometry = new TextGeometry("Mykael Barnes", {
//           font: font,
//           size: 5,
//           height: 1,
//           curveSegments: 10,
//           bevelEnabled: false,
//           bevelOffset: 0,
//           bevelSegments: 1,
//           bevelSize: 0.3,
//           bevelThickness: 1
//         });
//         const materials = [
//             new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
//             new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
//         ];
//         const textMesh = new THREE.Mesh(geometry, materials);
//         textMesh.castShadow = true
//         textMesh.position.setY(50)
//         textMesh.position.x -= 6
//         textMesh.rotation.y = 0.25
//         scene.add(textMesh);
//     });

// Optional light helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);


// Creates stars and adds them to the scene

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

// Fills scene with stars

Array(200).fill().forEach(addStar);

// Textures & background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// Moon

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

// testing

// const idk = new THREE.Mesh(
//   new THREE.TorusGeometry(10, 3, 16, 100),
//   new THREE.MeshStandardMaterial( {
//     color: 0xFF6347, wireframe: true
//   })
// )

// scene.add(idk);



// Orbit Control Limitations

controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;
controls.minDistance = 70;
controls.maxDistance = 70;
controls.enablePan = false;

// Animation

function animate() {
    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
}

animate();

// not three js

