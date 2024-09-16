// Product data (you can replace this with your actual product data)
const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
];

let currentIndex = 0;

function createCarousel() {
  const carousel = document.getElementById('productCarousel');
  if (!carousel) {
    console.error('Product carousel element not found');
    return;
  }

  const carouselContent = document.createElement('div');
  carouselContent.className = 'carousel-content';
  
  for (let i = 0; i < 3; i++) {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    productBox.innerHTML = `<p>${products[i].name}</p>`;
    carouselContent.appendChild(productBox);
  }
  
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-button prev';
  prevButton.innerHTML = '&lt;';
  prevButton.addEventListener('click', () => navigate(-1));
  
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-button next';
  nextButton.innerHTML = '&gt;';
  nextButton.addEventListener('click', () => navigate(1));
  
  carousel.appendChild(prevButton);
  carousel.appendChild(carouselContent);
  carousel.appendChild(nextButton);
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + products.length) % products.length;
  updateCarousel();
}

function updateCarousel() {
  const productBoxes = document.querySelectorAll('.product-box');
  for (let i = 0; i < 3; i++) {
    const productIndex = (currentIndex + i) % products.length;
    productBoxes[i].innerHTML = `<p>${products[productIndex].name}</p>`;
  }
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', createCarousel);