---
layout: default
title: "Mat Warren"
---

<main class="grid-page">

    <div>
        <p>
            Mat Warren is a musician, digital artist and creative technologist based in Leitrim, Ireland. His work spans music, interactive audiovisual installation, creative coding, field recording, sound design and instrument building. This site documents projects, releases, broadcasts and ongoing work.
        </p>

    </div>

    <h1 id="journal-filter-title"></h1>

    <div class="project-grid">

    {% assign projects = site.projects | sort: "date" | reverse %}

    {% for project in projects %}

        <article class="project-tile project-tile-{{ project.tile_size }}" data-category="{{ project.categories | join: ' ' }}">

            <a href="{{ project.url | relative_url }}" class="project-tile-link">

                <img
                    src="{{ project.thumbnail | relative_url }}"
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