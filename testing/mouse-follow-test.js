document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    const element = document.querySelector('.mouse-follower');

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
});

const follower = document.createElement('div');
follower.classList.add('mouse-follower');
document.body.appendChild(follower);

// Styling the follower and ensuring custom cursor across all elements
const style = document.createElement('style');
style.textContent = `
body, a, button, .btn {
    cursor: none !important; /* Hide the default cursor across all elements */
}

.mouse-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    background-color: var(--electric-purple);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -50%);
}
`;
document.head.appendChild(style);
