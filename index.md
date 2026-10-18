---
layout: default
title: "Mat Warren"
---

<main class="grid-page">

    <div>
        <p>
            Mat Warren is a musician, sound engineer and creative technologist based in Leitrim, Ireland. His work moves between sound, music, technology and performance. Through installations, releases, live productions and experimental systems, his practice explores the relationship between physical interaction and sound.
        </p>

    </div>

    <h1 id="journal-filter-title"></h1>

    <div class="project-grid">

    {% for project in site.projects %}

        <article class="project-tile project-tile-{{ project.tile_size }}" data-category="{{ project.categories | join: ' ' }}">

            <a href="{{ project.url }}" class="project-tile-link">

                <img
                    src="{{ project.thumbnail }}"
                    alt="{{ project.title }} {{ project.subtitle }}">

                <div class="project-info">

                    <h2>{{ project.title }}</h2>

                    <p>
                        {{ project.subtitle }}
                    </p>

                    <p>
                        {{ project.date | date: "%d.%m.%Y" }}
                    </p>

                </div>

            </a>

        </article>

    {% endfor %}

</div>

</main>