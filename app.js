import * as THREE from 'https://cdn.skypack.dev/three@0.157.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'https://cdn.skypack.dev/three@0.157.0/examples/jsm/loaders/IFCLoader.js';

let scene, camera, renderer, controls;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 3, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Load IFS Model
    const ifcLoader = new IFCLoader();
    ifcLoader.load('./models/Kaapelitehdas_junction.ifc', (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const model = new THREE.Mesh(geometry, material);
        scene.add(model);
    });

    // Resize listener
    window.addEventListener('resize', onWindowResize);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
