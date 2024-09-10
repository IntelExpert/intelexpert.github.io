// First canvas and context for background stars
const canvas = document.getElementById('cosmicCanvas');
const ctx = canvas.getContext('2d');

// Second canvas and context for parallax stars
const canvas2 = document.getElementById('cosmicCanvasLayer2');
const ctx2 = canvas2.getContext('2d');

// Third canvas and context for purple waves
const waveCanvas = document.getElementById('waveCanvas');
const waveCtx = waveCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    const height = document.documentElement.scrollHeight; // Full document height

    canvas.width = window.innerWidth;
    canvas.height = height;
    
    canvas2.width = window.innerWidth;
    canvas2.height = height;

    waveCanvas.width = window.innerWidth;
    waveCanvas.height = height;
}
resizeCanvas();

// Colors
const colors = {
    background: '#000000',
    stars: '#FFFFFF',
    energyWave: '#8A2BE2'
};

// Stars for the first layer
const stars = [];
const starCount = 1200;

// Create stars for the first layer
for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        direction: Math.random() > 0.5 ? 0.02 : -0.02
    });
}

// Stars for the second layer (parallax effect)
const stars2 = [];
const starCount2 = 600; // Fewer stars for the second layer

// Create stars for the second layer
for (let i = 0; i < starCount2; i++) {
    stars2.push({
        x: Math.random() * canvas2.width,
        y: Math.random() * canvas2.height,
        radius: Math.random() * 1.8, // Smaller stars for the second layer
        alpha: Math.random(),
        direction: Math.random() > 0.5 ? 0.01 : -0.01 // Twinkle effect
    });
}

// Energy waves
const waves = [];
const waveOffsetY = window.innerHeight / 2; // Middle of the screen
const waveCount = 3;

// Create waves
for (let i = 0; i < waveCount; i++) {
    waves.push({
        y: waveOffsetY + (i - 1) * 100, // Adjust this to control spacing
        amplitude: 50,
        frequency: 0.02,
        offset: i * Math.PI / 2
    });
}

// Function to draw stars on a specified canvas context
function drawStar(ctx, star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
}

// Function to draw energy waves
function drawWave(wave, time) {
    waveCtx.beginPath();
    waveCtx.moveTo(0, wave.y);
    for (let x = 0; x < waveCanvas.width; x++) {
        waveCtx.lineTo(x, wave.y + Math.sin(x * wave.frequency + time + wave.offset) * wave.amplitude);
    }
    waveCtx.strokeStyle = colors.energyWave;
    waveCtx.lineWidth = 2;
    waveCtx.stroke();
}

// Function to handle parallax scrolling based on user's scroll position
function handleScroll() {
    const scrollTop = window.scrollY; // Current scroll position
    const speedFactor1 = 0.4; // Speed factor for the first layer
    const speedFactor2 = 0.05; // Speed factor for the second layer (slower)

    // Calculate new Y position for each star based on scroll
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear first canvas
    ctx.fillStyle = colors.background; // Solid background for first canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        drawStar(ctx, {
            ...star,
            y: star.y + scrollTop * speedFactor1 // Adjust based on scroll speed
        });
    });

    // Clear second canvas for transparent background
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    stars2.forEach(star => {
        drawStar(ctx2, {
            ...star,
            y: star.y + scrollTop * speedFactor2 // Adjust based on slower scroll speed
        });
    });
}

// Animate both layers and waves
function animateLayers(time) {
    // Update star alpha values for twinkling effect
    stars.forEach(star => {
        star.alpha += star.direction;
        if (star.alpha > 1 || star.alpha < 0) star.direction *= -1;
    });

    stars2.forEach(star => {
        //star.alpha += star.direction;
        //if (star.alpha > 1 || star.alpha < 0) star.direction *= -1;
    });

    // Clear and redraw the waves on their canvas
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    waves.forEach(wave => {
        drawWave(wave, time * 0.001);
    });

    // Re-draw stars to keep twinkling while scrolling
    handleScroll();

    requestAnimationFrame(animateLayers);
}

// Initial draw and animate waves
animateLayers(0);

// Update stars position on scroll
window.addEventListener('scroll', handleScroll);

// Resize canvases when window is resized
window.addEventListener('resize', () => {
    resizeCanvas();
    const waveOffsetY = window.innerHeight / 2; // Middle of the screen

    // Recalculate wave positions
    waves.forEach((wave, index) => {
        wave.y = waveOffsetY + (index - 1) * 100; // Adjust as needed
    });

    // Recalculate star positions for both layers
    stars.forEach(star => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
    });

    stars2.forEach(star => {
        star.x = Math.random() * canvas2.width;
        star.y = Math.random() * canvas2.height;
    });

    // Re-render stars on resize
    handleScroll();
});
