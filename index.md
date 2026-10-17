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

    <h1>JOURNAL</h1>

    <div class="project-grid">

    {% for project in site.projects %}

        <article class="project-tile project-tile-large" data-category="selected-projects">

            <a href="projects/yats.html" class="project-tile-link">

                <img
                    src="images/YATS_Image_1.jpg"
                    alt="You Are the Signal (YATS) interactive audiovisual installation">

                <div class="project-info">

                    <h2>YOU ARE THE SIGNAL (YATS)</h2>

                    <p>
                        Interactive audiovisual installation
                    </p>

                    <p>
                        18.09.2026
                    </p>

                    <div class="project-description">

                        <!-- <p>
                            An interactive audiovisual installation where the
                            movement of participants shapes sound and projected
                            visuals in real time.
                        </p>

                        <p>
                            Developed for Culture Night 2026 at The Dock in
                            Carrick-on-Shannon.
                        </p> -->

                    </div>

                </div>

            </a>

        </article>

    {% endfor %}   

    </div>

</main>