// Image data
const imageData = [
    {
        id: 1,
        url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Mountain Lake',
        category: 'nature',
        description: 'Serene mountain lake with crystal clear water'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Modern Architecture',
        category: 'architecture',
        description: 'Contemporary building with geometric design'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Forest Path',
        category: 'nature',
        description: 'Mystical forest pathway in autumn'
    },
    {
        id: 4,
        url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Portrait Study',
        category: 'people',
        description: 'Artistic portrait with natural lighting'
    },
    {
        id: 5,
        url: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'City Skyline',
        category: 'architecture',
        description: 'Urban cityscape at golden hour'
    },
    {
        id: 6,
        url: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Ocean Waves',
        category: 'nature',
        description: 'Powerful ocean waves crashing on shore'
    },
    {
        id: 7,
        url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Street Photography',
        category: 'people',
        description: 'Candid street scene with natural expressions'
    },
    {
        id: 8,
        url: 'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Desert Landscape',
        category: 'nature',
        description: 'Vast desert landscape with dramatic lighting'
    },
    {
        id: 9,
        url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Modern Interior',
        category: 'architecture',
        description: 'Minimalist interior design with clean lines'
    },
    {
        id: 10,
        url: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Lifestyle Portrait',
        category: 'people',
        description: 'Natural lifestyle photography outdoors'
    },
    {
        id: 11,
        url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Tropical Paradise',
        category: 'nature',
        description: 'Tropical beach with palm trees and clear water'
    },
    {
        id: 12,
        url: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Industrial Design',
        category: 'architecture',
        description: 'Modern industrial building with steel structure'
    }
];

// Gallery state
let currentCategory = 'all';
let filteredImages = [...imageData];
let currentLightboxIndex = 0;

// DOM elements
const categoryFilter = document.getElementById('categoryFilter');
const imageGrid = document.getElementById('imageGrid');
const emptyState = document.getElementById('emptyState');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Initialize gallery
function initGallery() {
    setupEventListeners();
    renderImages();
}

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    categoryFilter.addEventListener('click', handleCategoryFilter);
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Lightbox backdrop click
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevent body scroll when lightbox is open
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Handle category filter
function handleCategoryFilter(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    
    // Update active button
    categoryFilter.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update current category
    currentCategory = e.target.dataset.category;
    
    // Filter and render images
    filterImages();
    renderImages();
}

// Filter images by category
function filterImages() {
    if (currentCategory === 'all') {
        filteredImages = [...imageData];
    } else {
        filteredImages = imageData.filter(image => image.category === currentCategory);
    }
}

// Render images
function renderImages() {
    // Clear grid
    imageGrid.innerHTML = '';
    
    // Show/hide empty state
    if (filteredImages.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }
    
    // Create image cards
    filteredImages.forEach((image, index) => {
        const imageCard = createImageCard(image, index);
        imageGrid.appendChild(imageCard);
        
        // Add fade-in animation with delay
        setTimeout(() => {
            imageCard.classList.add('fade-in');
        }, index * 100);
    });
}

// Create image card element
function createImageCard(image, index) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.addEventListener('click', () => openLightbox(index));
    
    card.innerHTML = `
        <div class="image-container">
            <div class="image-loading">
                <div class="spinner"></div>
            </div>
            <img src="${image.url}" alt="${image.title}" onload="handleImageLoad(this)" onerror="handleImageError(this)">
            <div class="category-badge">${image.category}</div>
            <div class="image-overlay">
                <h3 class="image-title">${image.title}</h3>
                <p class="image-description">${image.description}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Handle image load
function handleImageLoad(img) {
    const loadingSpinner = img.parentElement.querySelector('.image-loading');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
    img.classList.add('loaded');
}

// Handle image error
function handleImageError(img) {
    const container = img.parentElement;
    const loadingSpinner = container.querySelector('.image-loading');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
    
    container.innerHTML = `
        <div class="image-error">
            <div class="image-error-icon">📷</div>
            <div class="image-error-text">Failed to load</div>
        </div>
        <div class="category-badge">${img.alt.split(' ')[0]}</div>
    `;
}

// Open lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add scale-in animation
    lightbox.querySelector('.lightbox-content').classList.add('scale-in');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'unset';
    
    // Remove animation class
    setTimeout(() => {
        lightbox.querySelector('.lightbox-content').classList.remove('scale-in');
    }, 300);
}

// Show previous image
function showPreviousImage() {
    currentLightboxIndex = currentLightboxIndex === 0 
        ? filteredImages.length - 1 
        : currentLightboxIndex - 1;
    updateLightboxContent();
}

// Show next image
function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightboxContent();
}

// Update lightbox content
function updateLightboxContent() {
    const image = filteredImages[currentLightboxIndex];
    
    lightboxImage.src = image.url;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxMeta.textContent = `${image.category} • ${currentLightboxIndex + 1} of ${filteredImages.length}`;
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPreviousImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextImage();
            break;
    }
}

// Smooth scroll to top when category changes
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Add some utility functions for better UX
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive behavior
const handleResize = debounce(() => {
    // Recalculate layout if needed
    if (lightbox.classList.contains('active')) {
        // Adjust lightbox positioning on resize
        updateLightboxContent();
    }
}, 250);

window.addEventListener('resize', handleResize);

// Preload images for better performance
function preloadImages() {
    imageData.forEach(image => {
        const img = new Image();
        img.src = image.url;
    });
}

// Start preloading after initial render
setTimeout(preloadImages, 1000);