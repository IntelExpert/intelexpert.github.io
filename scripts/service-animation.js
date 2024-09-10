document.addEventListener('DOMContentLoaded', function() {
    // Create an intersection observer to detect when blocks are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Add the 'show' class when visible
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.5 // Trigger when half of the block is in view
    });

    // Observe each block in the services section
    document.querySelectorAll('.block').forEach(block => {
        observer.observe(block);
    });
});