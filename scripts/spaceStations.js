// Get the 4th canvas for space stations
const canvas4 = document.getElementById('spaceStationLayer');
const ctx4 = canvas4.getContext('2d');

// Set the canvas size
function resizeSpaceStationCanvas() {
    canvas4.width = window.innerWidth;
    canvas4.height = document.documentElement.scrollHeight;
}
resizeSpaceStationCanvas();

// Create 20 space stations with random positions, size, and rotation
const stationCount = 6;
const spaceStations = [];

for (let i = 0; i < stationCount; i++) {
    spaceStations.push({
        x: Math.random() * canvas4.width,
        y: Math.random() * canvas4.height,
        size: Math.random() * 0.1 + 0.2, // Random scale between 0.2 and 0.7
        rotation: Math.random() * Math.PI * 2, // Random starting rotation
        rotationSpeed: Math.random() * 0.003 + 0.001 // Random rotation speed
    });
}

// Function to draw a space station (scaled down)
function drawSpaceStation(x, y, size, rotation) {
    const bodyWidth = 50;
    const bodyHeight = 20;

    // Save the context state
    ctx4.save();
    ctx4.translate(x, y);
    ctx4.scale(size, size); // Apply scale
    ctx4.rotate(rotation);  // Apply rotation

    // Draw main body (central module)
    ctx4.beginPath();
    ctx4.rect(-bodyWidth / 2, -bodyHeight / 2, bodyWidth, bodyHeight);
    ctx4.fillStyle = 'white';
    ctx4.fill();
    ctx4.strokeStyle = 'white';
    ctx4.lineWidth = 1;
    ctx4.stroke();

    // Draw solar panels connected to the main body
    drawSolarPanels(ctx4, bodyWidth, bodyHeight);

    // Draw modules connected to the main body
    drawModules(ctx4, bodyWidth, bodyHeight);

    // Restore the context state
    ctx4.restore();
}

// Function to draw solar panels (similar to the satellite design)
function drawSolarPanels(ctx, bodyWidth, bodyHeight) {
    const panelWidth = 70;
    const panelHeight = 10;
    const strutLength = 10;

    // Left panel (with connecting strut)
    ctx.beginPath();
    ctx.rect(-bodyWidth / 2 - strutLength - panelWidth, -panelHeight / 2, panelWidth, panelHeight);
    ctx.fillStyle = '#0077FF';
    ctx.fill();
    ctx.stroke();

    // Right panel (with connecting strut)
    ctx.beginPath();
    ctx.rect(bodyWidth / 2 + strutLength, -panelHeight / 2, panelWidth, panelHeight);
    ctx.fillStyle = '#0077FF';
    ctx.fill();
    ctx.stroke();

    // Struts connecting the panels to the body
    ctx.beginPath();
    ctx.moveTo(-bodyWidth / 2, 0);
    ctx.lineTo(-bodyWidth / 2 - strutLength, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bodyWidth / 2, 0);
    ctx.lineTo(bodyWidth / 2 + strutLength, 0);
    ctx.stroke();
}

// Function to draw connected modules (same as satellites)
function drawModules(ctx, bodyWidth, bodyHeight) {
    const moduleRadius = 5;

    // Top module
    ctx.beginPath();
    ctx.arc(0, -bodyHeight / 2 - moduleRadius, moduleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Bottom module
    ctx.beginPath();
    ctx.arc(0, bodyHeight / 2 + moduleRadius, moduleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Left connecting module
    ctx.beginPath();
    ctx.arc(-bodyWidth / 2 - 20, 0, moduleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Right connecting module
    ctx.beginPath();
    ctx.arc(bodyWidth / 2 + 20, 0, moduleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Struts connecting modules to the body
    ctx.beginPath();
    ctx.moveTo(0, -bodyHeight / 2);
    ctx.lineTo(0, -bodyHeight / 2 - moduleRadius);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, bodyHeight / 2);
    ctx.lineTo(0, bodyHeight / 2 + moduleRadius);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-bodyWidth / 2, 0);
    ctx.lineTo(-bodyWidth / 2 - 20, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bodyWidth / 2, 0);
    ctx.lineTo(bodyWidth / 2 + 20, 0);
    ctx.stroke();
}

// Function to animate the space stations
function animateSpaceStations() {
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height); // Clear the 4th canvas

    spaceStations.forEach(station => {
        // Update rotation
        station.rotation += station.rotationSpeed;

        // Draw each space station at its unique position, scale, and rotation
        drawSpaceStation(station.x, station.y, station.size, station.rotation);
    });

    requestAnimationFrame(animateSpaceStations);
}

// Start the animation
animateSpaceStations();

// Handle window resizing for the 4th canvas
window.addEventListener('resize', resizeSpaceStationCanvas);
