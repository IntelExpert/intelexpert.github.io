// Reference the existing canvas element
const windmillCanvas = document.getElementById('windmillCanvas');
const windmillCtx = windmillCanvas.getContext('2d');

// Resize canvas to fit the container block
function initWindmillCanvas() {
    const block = document.querySelector('.block-content'); // Use the block's dimensions
    windmillCanvas.width = block.offsetWidth;
    windmillCanvas.height = block.offsetHeight;
}
initWindmillCanvas();

const centerX = windmillCanvas.width / 2;
const baseY = windmillCanvas.height - 100; // Adjusting the baseY position relative to the block height
let bladeAngle = 0;

// Function to draw the windmill
function drawWindmill() {
    const windmillHeight = windmillCanvas.height * 0.5; // Adjust windmill size dynamically
    const bladeLength = windmillCanvas.width * 0.15; // Adjust blade size relative to canvas width

    // Draw windmill base
    windmillCtx.beginPath();
    windmillCtx.moveTo(centerX - 20, baseY);
    windmillCtx.lineTo(centerX, baseY - windmillHeight);
    windmillCtx.lineTo(centerX + 20, baseY);
    windmillCtx.closePath();
    windmillCtx.strokeStyle = 'white';
    windmillCtx.lineWidth = 2;
    windmillCtx.stroke();
    windmillCtx.fillStyle = 'white';
    windmillCtx.fill();

    // Draw windmill blades
    drawBlades(centerX, baseY - windmillHeight, bladeAngle, bladeLength);

    // Update blade angle for animation
    bladeAngle += 0.05;
}

// Function to draw the rotating blades
function drawBlades(x, y, angle, length) {
    windmillCtx.save();
    windmillCtx.translate(x, y);
    windmillCtx.rotate(angle);

    // Draw 4 blades
    for (let i = 0; i < 4; i++) {
        windmillCtx.beginPath();
        windmillCtx.moveTo(0, 0);
        windmillCtx.lineTo(0, -length);
        windmillCtx.strokeStyle = 'white';
        windmillCtx.lineWidth = 4;
        windmillCtx.stroke();
        windmillCtx.rotate(Math.PI / 2); // Rotate 90 degrees for the next blade
    }

    windmillCtx.restore();
}

// Animation loop
function animate() {
    windmillCtx.clearRect(0, 0, windmillCanvas.width, windmillCanvas.height); // Clear canvas each frame
    drawWindmill();
    requestAnimationFrame(animate);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    initWindmillCanvas();
});
