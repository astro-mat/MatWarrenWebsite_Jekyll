const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const images = [...document.querySelectorAll('.lightbox-image')];

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {

    img.addEventListener('click', () => {

        currentIndex = index;

        lightboxImg.src = img.src;
        lightbox.classList.add('is-open');

    });

});

// Close button
document.querySelector('.lightbox-close')
    .addEventListener('click', () => {

        lightbox.classList.remove('is-open');

    });

// Click background to close
lightbox.addEventListener('click', event => {

    if (event.target === lightbox) {

        lightbox.classList.remove('is-open');

    }

});

// Next image
document.querySelector('.lightbox-next')
    .addEventListener('click', event => {

        event.stopPropagation();

        currentIndex = (currentIndex + 1) % images.length;

        lightboxImg.src = images[currentIndex].src;

    });

// Previous image
document.querySelector('.lightbox-prev')
    .addEventListener('click', event => {

        event.stopPropagation();

        currentIndex =
            (currentIndex - 1 + images.length) % images.length;

        lightboxImg.src = images[currentIndex].src;

    });

// Keyboard controls
document.addEventListener('keydown', event => {

    if (!lightbox.classList.contains('is-open')) return;

    if (event.key === 'Escape') {

        lightbox.classList.remove('is-open');

    }

    if (event.key === 'ArrowRight') {

        currentIndex = (currentIndex + 1) % images.length;

        lightboxImg.src = images[currentIndex].src;

    }

    if (event.key === 'ArrowLeft') {

        currentIndex =
            (currentIndex - 1 + images.length) % images.length;

        lightboxImg.src = images[currentIndex].src;

    }

});