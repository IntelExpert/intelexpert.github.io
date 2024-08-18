    const canvas = document.getElementById('cosmicCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Colors
    const colors = {
        background: '#000000',
        stars: '#FFFFFF',
        energyWave: '#8A2BE2'
    };

    // Stars
    const stars = [];
    const starCount = 200;

    // Energy waves
    const waves = [];
    const waveCount = 3;

    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            direction: Math.random() > 0.5 ? 0.02 : -0.02
        });
    }

    // Create waves
    for (let i = 0; i < waveCount; i++) {
        waves.push({
            y: canvas.height / 2 + (i - 1) * 100,
            amplitude: 50,
            frequency: 0.02,
            offset: i * Math.PI / 2
        });
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }

    function drawWave(wave, time) {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let x = 0; x < canvas.width; x++) {
            ctx.lineTo(x, wave.y + Math.sin(x * wave.frequency + time + wave.offset) * wave.amplitude);
        }
        ctx.strokeStyle = colors.energyWave;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function animate(time) {
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animate and draw stars
        stars.forEach(star => {
            star.alpha += star.direction;
            if (star.alpha > 1 || star.alpha < 0) star.direction *= -1;
            drawStar(star);
        });

        // Animate and draw waves
        waves.forEach(wave => {
            drawWave(wave, time * 0.001);
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate(0);

    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Recalculate wave positions
        waves.forEach((wave, index) => {
            wave.y = canvas.height / 2 + (index - 1) * 100;
        });
    });