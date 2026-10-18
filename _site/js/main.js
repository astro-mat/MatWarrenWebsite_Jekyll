// ========================================
// JOURNAL FILTERING — MORPHING
// ========================================

const filterTitle = document.getElementById('journal-filter-title');

const buttons = document.querySelectorAll('.nav-link[data-filter]');
const entries = document.querySelectorAll('.project-tile');

if (buttons.length && entries.length) {

    
    // ----------------------------------------
    // 1. Remember current positions
    // ----------------------------------------
    
    function filterEntries(filter) {
        
        
        if (filterTitle) {
            const titles = {
                all: '',
                'selected-projects': 'SELECTED PROJECTS',
                music: 'MUSIC',
            };
            
            const title = titles[filter] || '';

            filterTitle.textContent = title;

            if (title === '') {
                filterTitle.style.display = 'none';
            } else {
                filterTitle.style.display = '';
            }

        }
        
        const firstPositions = new Map();

        entries.forEach(entry => {

            if (entry.style.display !== 'none') {
                firstPositions.set(
                    entry,
                    entry.getBoundingClientRect()
                );
            }

        });


        // ----------------------------------------
        // 2. Decide which entries should be visible
        // ----------------------------------------

        entries.forEach(entry => {

            const categories = entry.dataset.category
                ? entry.dataset.category.split(' ')
                : [];

            const shouldShow =
                filter === 'all'
                    ? !categories.includes('live-sound')
                    : categories.includes(filter);

            if (shouldShow) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }

        });


        // ----------------------------------------
        // 3. Get new positions
        // ----------------------------------------

        const lastPositions = new Map();

        entries.forEach(entry => {

            if (entry.style.display !== 'none') {
                lastPositions.set(
                    entry,
                    entry.getBoundingClientRect()
                );
            }

        });


        // ----------------------------------------
        // 4. Animate the movement
        // ----------------------------------------

        entries.forEach(entry => {

            const first = firstPositions.get(entry);
            const last = lastPositions.get(entry);

            // Entry was already visible
            if (first && last) {

                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;

                entry.style.transform =
                    `translate(${deltaX}px, ${deltaY}px)`;

                entry.style.transition = 'none';

                requestAnimationFrame(() => {

                    entry.style.transition =
                        'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

                    entry.style.transform = 'translate(0, 0)';

                });

            }

            // Entry is newly appearing
            else if (last) {

                entry.style.opacity = '0';
                entry.style.transform = 'translateY(20px)';
                entry.style.transition = 'none';

                requestAnimationFrame(() => {

                    entry.style.transition =
                        'opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

                    entry.style.opacity = '1';
                    entry.style.transform = 'translateY(0)';

                });

            }

        });


        // ----------------------------------------
        // 5. Update active navigation
        // ----------------------------------------

        buttons.forEach(button => {

            button.classList.toggle(
                'active',
                button.dataset.filter === filter
            );

        });

    }


    // ----------------------------------------
    // Navigation
    // ----------------------------------------

    buttons.forEach(button => {

        button.addEventListener('click', event => {

            event.preventDefault();

            const filter = button.dataset.filter;

            filterEntries(filter);

            history.pushState(
                { filter: filter },
                '',
                `index.html?filter=${filter}`
            );

        });

    });


    // ----------------------------------------
    // Initial filter from URL
    // ----------------------------------------

    const params = new URLSearchParams(window.location.search);
    const filterFromURL = params.get('filter') || 'all';

    filterEntries(filterFromURL);

}


// ========================================
// MORE / LESS
// ========================================

const moreButtons = document.querySelectorAll('.project-tile-more');

if (moreButtons.length) {

    moreButtons.forEach(button => {

        button.addEventListener('click', () => {

            const entry = button.closest('.project-tile');
            const extras = entry.querySelectorAll('.project-tile-extra');

            const isOpen = extras[0].classList.contains('is-open');

            extras.forEach(extra => {
                extra.classList.toggle('is-open');
            });

            if (isOpen) {
                button.textContent = 'More →';
            } else {
                button.textContent = 'Less ←';
            }

        });

    });

}



// ========================================
// LIGHTBOX
// ========================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox-close');

if (lightbox && lightboxImage && closeButton) {

    document.querySelectorAll('.lightbox-image').forEach(image => {

        image.addEventListener('click', () => {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add('is-open');

        });

    });


    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('is-open');
    });


    lightbox.addEventListener('click', event => {

        if (event.target === lightbox) {
            lightbox.classList.remove('is-open');
        }

    });


    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {
            lightbox.classList.remove('is-open');
        }

    });

}