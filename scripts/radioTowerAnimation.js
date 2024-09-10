document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('radioTowerCanvas');
    const ctx = canvas.getContext('2d');

    function resizeRadioTowerCanvas() {
        const block = document.querySelector('.block-content');
        canvas.width = block.offsetWidth;
        canvas.height = block.offsetHeight;
    }
    resizeRadioTowerCanvas();

    const centerX = canvas.width / 2;
    const baseY = canvas.height - 50;
    let waves = [];

    const waveSpeed = 0.3;
    const waveSpacing = 1800;

    function drawRadioTower() {
        const towerHeight = canvas.height * 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX, baseY);
        ctx.lineTo(centerX, baseY - towerHeight);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        const numTrusses = 3;
        for (let i = 0; i < numTrusses; i++) {
            const yPos = baseY - (i * towerHeight) / numTrusses;
            ctx.beginPath();
            ctx.moveTo(centerX - 20, yPos);
            ctx.lineTo(centerX + 20, yPos);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(centerX, baseY - towerHeight, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    function drawWaves() {
        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.arc(centerX, baseY - 200, wave.radius, -5 * Math.PI / 6, -Math.PI / 6);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            wave.radius += waveSpeed;

            if (wave.radius > 75) {
                waves.splice(index, 1);
            }
        });
    }

    function addWave() {
        waves.push({ radius: 0 });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRadioTower();
        drawWaves();
        requestAnimationFrame(animate);
    }

    setInterval(addWave, waveSpacing);
    animate();

    window.addEventListener('resize', resizeRadioTowerCanvas);
});
