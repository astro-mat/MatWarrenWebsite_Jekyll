
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-link[data-filter]');
    const grid = document.querySelector('.project-grid');
    const tiles = Array.from(document.querySelectorAll('.project-tile'));
    const title = document.querySelector('.grid-page h1');

    if (!grid || !tiles.length) return;

    const titles = {
        all: 'JOURNAL',
        'selected-projects': 'SELECTED PROJECTS',
        music: 'MUSIC',
        'live-sound': 'LIVE SOUND'
    };

    const duration = 800;
    const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

    let resizeTimer;
    let currentFilter = 'all';
    let animationFrame;

    function getColumnCount() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
    }

    function layoutTiles(animate = false) {
        cancelAnimationFrame(animationFrame);

        const visibleTiles = tiles.filter(tile => !tile.hidden);
        const firstPositions = new Map();

        // Remember where visible tiles currently are.
        if (animate) {
            visibleTiles.forEach(tile => {
                firstPositions.set(tile, tile.getBoundingClientRect());
            });
        }

        const columnCount = getColumnCount();
        const columnWidth = grid.clientWidth / columnCount;
        const columnHeights = Array(columnCount).fill(0);

        grid.style.position = 'relative';
        grid.style.display = 'block';

        // Place each tile in the shortest column.
        visibleTiles.forEach(tile => {
            tile.style.position = 'absolute';
            tile.style.width = `${100 / columnCount}%`;
            tile.style.left = '0';
            tile.style.top = '0';
            tile.style.margin = '0';
            tile.style.transition = 'none';
            tile.style.transform = 'none';
            tile.style.opacity = '1';
        });

        // Measure heights before positioning.
        visibleTiles.forEach(tile => {
            tile.style.left = '0';
            tile.style.top = '0';
        });

        visibleTiles.forEach(tile => {
            const column = columnHeights.indexOf(
                Math.min(...columnHeights)
            );

            const x = column * columnWidth;
            const y = columnHeights[column];

            tile.style.left = `${x}px`;
            tile.style.top = `${y}px`;

            columnHeights[column] += tile.offsetHeight;
        });

        grid.style.height = `${Math.max(0, ...columnHeights)}px`;

        if (!animate) return;

        // Measure the new positions and animate between them.
        animationFrame = requestAnimationFrame(() => {
            visibleTiles.forEach(tile => {
                const first = firstPositions.get(tile);
                const last = tile.getBoundingClientRect();

                if (first) {
                    const dx = first.left - last.left;
                    const dy = first.top - last.top;

                    if (dx || dy) {
                        tile.style.transition = 'none';
                        tile.style.transform =
                            `translate(${dx}px, ${dy}px)`;

                        tile.getBoundingClientRect();

                        tile.style.transition =
                            `transform ${duration}ms ${easing}`;

                        tile.style.transform = 'translate(0, 0)';
                    }
                } else {
                    // Newly visible tiles fade and rise into place.
                    tile.style.opacity = '0';
                    tile.style.transform = 'translateY(20px)';
                    tile.style.transition = 'none';

                    tile.getBoundingClientRect();

                    tile.style.transition =
                        `opacity 400ms ease, transform ${duration}ms ${easing}`;

                    tile.style.opacity = '1';
                    tile.style.transform = 'translateY(0)';
                }
            });
        });
    }

    function filterTiles(filter, animate = true) {
        currentFilter = filter;

        if (title) {
            const newTitle = titles[filter] || 'index';

            if (title.textContent !== newTitle) {
                title.classList.remove('is-entering');

                // Restart the animation.
                void title.offsetWidth;

                title.textContent = newTitle;
                title.classList.add('is-entering');
            }
        }

        // Animate tiles that remain visible, hide the rest.
        tiles.forEach(tile => {
            const categories = (tile.dataset.category || '')
                .split(/\s+/)
                .filter(Boolean);

            const shouldShow =
                filter === 'all' || categories.includes(filter);

            if (shouldShow && tile.hidden) {
                tile.hidden = false;
                tile.style.opacity = '0';
                tile.style.transform = 'translateY(20px)';
            } else if (!shouldShow) {
                tile.hidden = true;
            }
        });

        buttons.forEach(button => {
            const active = button.dataset.filter === filter;

            button.classList.toggle('active', active);

            if (active) {
                button.setAttribute('aria-current', 'page');
            } else {
                button.removeAttribute('aria-current');
            }
        });

        // Recalculate after the visibility changes.
        requestAnimationFrame(() => layoutTiles(animate));
    }

    buttons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();

            const filter = button.dataset.filter || 'all';

            filterTiles(filter);

            const url = new URL(window.location.href);

            if (filter === 'all') {
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('filter', filter);
            }

            history.pushState({ filter }, '', url);
        });
    });

    function readFilterFromURL() {
        const params = new URLSearchParams(window.location.search);
        const filter = params.get('filter') || 'all';

        filterTiles(
            Object.prototype.hasOwnProperty.call(titles, filter)
                ? filter
                : 'all',
            false
        );
    }

    // Recalculate after images load, so their heights are correct.
    tiles.forEach(tile => {
        tile.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => layoutTiles(false));
                img.addEventListener('error', () => layoutTiles(false));
            }
        });
    });

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => layoutTiles(false), 120);
    });

    window.addEventListener('popstate', readFilterFromURL);

    readFilterFromURL();
});


