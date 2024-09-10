// Load Three.js from the CDN in your HTML file, so no need for import statements
// This assumes you have already included the Three.js library in your HTML via a script tag

// Scene and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('droneCanvas'), antialias: true, alpha: true });

function initDroneCanvas() {
    const block = document.querySelector('.block-content'); // Get the block container
    renderer.setSize(block.offsetWidth, block.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure proper scaling on high-DPI displays
    renderer.setClearColor(0x000000, 0); // This sets the background to transparent (RGBA)
}

initDroneCanvas();

// Lighting
const light = new THREE.AmbientLight(0x404040, 2);
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Drone creation function
function createDrone() {
    const droneGroup = new THREE.Group();

    // Main Drone Body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const droneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    droneGroup.add(droneBody);

    // Drone Arms (4 box arms)
    const armGeometry = new THREE.BoxGeometry(0.1, 0.1, 2);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const arm1 = new THREE.Mesh(armGeometry, armMaterial);
    arm1.position.set(0, 0.2, 1.1);
    droneGroup.add(arm1);

    const arm2 = arm1.clone();
    arm2.position.set(0, 0.2, -1.1);
    droneGroup.add(arm2);

    const arm3 = arm1.clone();
    arm3.rotation.y = Math.PI / 2;
    arm3.position.set(1.1, 0.2, 0);
    droneGroup.add(arm3);

    const arm4 = arm1.clone();
    arm4.rotation.y = Math.PI / 2;
    arm4.position.set(-1.1, 0.2, 0);
    droneGroup.add(arm4);

    // Propellers
    const propellerGeometry = new THREE.PlaneGeometry(0.6, 0.1);
    const propellerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    const propeller1 = new THREE.Mesh(propellerGeometry, propellerMaterial);
    propeller1.position.set(0, 0.3, 1.6);
    droneGroup.add(propeller1);

    const propeller2 = propeller1.clone();
    propeller2.position.set(0, 0.3, -1.6);
    droneGroup.add(propeller2);

    const propeller3 = propeller1.clone();
    propeller3.position.set(1.6, 0.3, 0);
    propeller3.rotation.y = Math.PI / 2;
    droneGroup.add(propeller3);

    const propeller4 = propeller1.clone();
    propeller4.position.set(-1.6, 0.3, 0);
    propeller4.rotation.y = Math.PI / 2;
    droneGroup.add(propeller4);

    return droneGroup;
}

const drone1 = createDrone();
drone1.scale.set(2, 2, 2); // Increase the size by 1.5 times in all dimensions (x, y, z)
scene.add(drone1);

// Camera Position
camera.position.set(0, 2, 10);
camera.lookAt(0, 0, 0);

// Responsive resizing
window.addEventListener('resize', function () {
    const block = document.querySelector('.block-content');
    renderer.setSize(block.offsetWidth, block.offsetHeight);
    camera.aspect = block.offsetWidth / block.offsetHeight;
    camera.updateProjectionMatrix();
});

// Animation Loop
let time = 0;

function animate() {
    requestAnimationFrame(animate);

    // Oscillation logic for drone movement
    time += 0.02;
    drone1.position.y = Math.sin(time * 1.8) * .5;
    drone1.rotation.x = Math.sin(time * 2) * 0.2;
    drone1.rotation.y = Math.cos(time / 2) * 0.8;

    // Spin propellers
    drone1.children.forEach(child => {
        if (child.geometry.type === 'PlaneGeometry') child.rotation.z += 0.2;
    });

    renderer.render(scene, camera);
}

animate();
