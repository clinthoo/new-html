const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const contactIcons = document.querySelectorAll('.contact-icon');
const cardImages = document.querySelectorAll('.card-image');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
let currentImageIndex = 0;
let allProjectImages = [];

// Initialize project images array
function initializeProjectImages() {
    allProjectImages = Array.from(cardImages);
}

function updateActiveLink() {
    const currentPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`nav a[href="#${section.id}"]`);

        if (!link) return;

        if (currentPosition >= top && currentPosition < bottom) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// PDF export removed — button and library were deleted per user request

contactIcons.forEach(icon => {
    icon.addEventListener('click', event => {
        const rect = icon.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        icon.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });
});

// Lightbox functionality
initializeProjectImages();

cardImages.forEach((img, index) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentImageIndex = index;
        openLightbox(img.src, img.alt);
    });
});

function openLightbox(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateNavigationButtons();
}

function closeLightbox() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const img = allProjectImages[currentImageIndex];
        openLightbox(img.src, img.alt);
    }
}

function showNextImage() {
    if (currentImageIndex < allProjectImages.length - 1) {
        currentImageIndex++;
        const img = allProjectImages[currentImageIndex];
        openLightbox(img.src, img.alt);
    }
}

function updateNavigationButtons() {
    modalPrev.disabled = currentImageIndex === 0;
    modalNext.disabled = currentImageIndex === allProjectImages.length - 1;
}

modalClose.addEventListener('click', closeLightbox);
modalPrev.addEventListener('click', showPreviousImage);
modalNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!imageModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPreviousImage();
    if (e.key === 'ArrowRight') showNextImage();
});
