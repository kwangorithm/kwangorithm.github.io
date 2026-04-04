const profile = window.PORTFOLIO_PROFILE;

function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.textContent = value;
    }
}

function setLink(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.href = value;
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function renderTagRow(items = []) {
    return items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
}

function renderList(items = []) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderHero() {
    const site = profile.site;
    document.title = `${site.title} | ${site.headline}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", site.metaDescription);
    }

    setText("heroEyebrow", site.eyebrow);
    setText("heroName", site.owner);
    setText("heroTitle", site.headline);
    setText("heroSummary", site.summary);
    setText("resumeNote", site.resumeNote);
    setText("syncDate", `Updated ${site.syncDate}`);
    setText("syncSource", site.syncSource);
    setText("heroLocation", site.location);

    setLink("heroGithub", site.github);
    setLink("heroLinkedin", site.linkedin);
    setLink("footerGithub", site.github);
    setLink("footerLinkedin", site.linkedin);
    setLink("footerEmail", `mailto:${site.email}`);

    const heroHighlights = document.getElementById("heroHighlights");
    heroHighlights.innerHTML = profile.highlights
        .map((item) => `<span class="hero-pill">${escapeHtml(item)}</span>`)
        .join("");

    const metricsGrid = document.getElementById("metricsGrid");
    metricsGrid.innerHTML = profile.metrics
        .map(
            (item) => `
                <article class="metric-card">
                    <span class="metric-value">${escapeHtml(item.value)}</span>
                    <span class="metric-label">${escapeHtml(item.label)}</span>
                </article>
            `
        )
        .join("");
}

function renderFocusAreas() {
    const focusGrid = document.getElementById("focusGrid");
    focusGrid.innerHTML = profile.focusAreas
        .map(
            (item) => `
                <article class="focus-card reveal">
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <p class="focus-description">${escapeHtml(item.description)}</p>
                    <div class="tag-row">${renderTagRow(item.tags)}</div>
                </article>
            `
        )
        .join("");
}

function renderProjects() {
    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.innerHTML = profile.projects
        .map(
            (item, index) => `
                <details class="project-dossier reveal" ${index === 0 ? "open" : ""}>
                    <summary class="dossier-head">
                        <div class="dossier-main">
                            <div class="project-meta">
                                <div>
                                    <h3 class="project-title">${escapeHtml(item.title)}</h3>
                                    <span class="project-role">${escapeHtml(item.role)}</span>
                                </div>
                                <span class="project-period">${escapeHtml(item.period)}</span>
                            </div>
                            <p class="project-summary">${escapeHtml(item.summary)}</p>
                            <div class="project-tags">${renderTagRow(item.tags)}</div>
                        </div>
                        <span class="detail-toggle">Details</span>
                    </summary>
                    <div class="dossier-body">
                        <div class="detail-grid">
                            <div class="project-list-wrap">
                                <h4>Contribution</h4>
                                <ul class="project-list">${renderList(item.contribution)}</ul>
                            </div>
                            <div class="project-list-wrap">
                                <h4>Outcome</h4>
                                <ul class="project-list">${renderList(item.outcome)}</ul>
                            </div>
                        </div>
                    </div>
                </details>
            `
        )
        .join("");
}

function renderResearch() {
    const researchGrid = document.getElementById("researchGrid");
    researchGrid.innerHTML = profile.research
        .map(
            (item) => `
                <article class="research-entry reveal">
                    <div class="entry-main">
                        <h3 class="research-title">${escapeHtml(item.title)}</h3>
                        <p class="research-body">${escapeHtml(item.description)}</p>
                    </div>
                    <div class="research-tags entry-tags">${renderTagRow(item.tags)}</div>
                </article>
            `
        )
        .join("");
}

function renderExperience() {
    const experienceGrid = document.getElementById("experienceGrid");
    experienceGrid.innerHTML = profile.experience
        .map(
            (item, index) => `
                <details class="timeline-entry reveal" ${index === 0 ? "open" : ""}>
                    <summary class="dossier-head">
                        <div class="dossier-main">
                            <div class="timeline-top">
                                <div>
                                    <h3 class="timeline-title">${escapeHtml(item.role)}</h3>
                                    <p class="timeline-company">${escapeHtml(item.company)}</p>
                                </div>
                                <span class="timeline-period">${escapeHtml(item.period)}</span>
                            </div>
                            <p class="timeline-summary">${escapeHtml(item.summary)}</p>
                        </div>
                        <span class="detail-toggle">Details</span>
                    </summary>
                    <div class="dossier-body">
                        <ul class="timeline-list">${renderList(item.highlights)}</ul>
                    </div>
                </details>
            `
        )
        .join("");
}

function renderEducation() {
    const educationGrid = document.getElementById("educationGrid");
    educationGrid.innerHTML = profile.education
        .map(
            (item) => `
                <article class="stack-card reveal">
                    <span class="stack-label">${escapeHtml(item.degree)}</span>
                    <h3 class="stack-title">${escapeHtml(item.school)}</h3>
                    <p class="stack-copy">${escapeHtml(item.focus)}</p>
                </article>
            `
        )
        .join("");
}

function renderAwards() {
    const awardsGrid = document.getElementById("awardsGrid");
    awardsGrid.innerHTML = profile.awards
        .map(
            (item) => `
                <article class="stack-card reveal">
                    <span class="stack-label">${escapeHtml(item.year)}</span>
                    <h3 class="stack-title">${escapeHtml(item.title)}</h3>
                    <p class="stack-copy">${escapeHtml(item.organization)}</p>
                    <p class="stack-copy">${escapeHtml(item.note)}</p>
                </article>
            `
        )
        .join("");
}

function renderPublications() {
    const publicationsGrid = document.getElementById("publicationsGrid");
    publicationsGrid.innerHTML = profile.publications
        .map(
            (item) => `
                <article class="publication-entry reveal">
                    <div class="publication-topline">
                        <div>
                            <h3 class="publication-title">${escapeHtml(item.title)}</h3>
                            <span class="publication-meta">${escapeHtml(item.venue)}</span>
                        </div>
                        <span class="status-pill">${escapeHtml(item.status)}</span>
                    </div>
                    <p class="publication-note">${escapeHtml(item.note)}</p>
                    <div class="publication-tags entry-tags">${renderTagRow(item.tags)}</div>
                </article>
            `
        )
        .join("");
}

function renderContact() {
    const contactCard = document.getElementById("contactCard");
    const site = profile.site;

    contactCard.innerHTML = `
        <div class="contact-block">
            <p class="contact-label">Email</p>
            <p class="contact-value"><a class="contact-link" href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>
        </div>
        <div class="contact-block">
            <p class="contact-label">LinkedIn</p>
            <p class="contact-value"><a class="contact-link" href="${escapeHtml(site.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(site.linkedinLabel)}</a></p>
        </div>
        <div class="contact-block">
            <p class="contact-label">GitHub</p>
            <p class="contact-value"><a class="contact-link" href="${escapeHtml(site.github)}" target="_blank" rel="noopener noreferrer">${escapeHtml(site.githubLabel)}</a></p>
        </div>
        <div class="contact-block">
            <p class="contact-label">Focus</p>
            <p class="contact-copy">${escapeHtml(site.contactNote)}</p>
        </div>
    `;
}

function setupNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    function closeMenu() {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
    }

    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    function updateActiveLink() {
        const offset = 140;
        let currentId = sections[0]?.id ?? "";

        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - offset) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
}

function setupReveal() {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -32px 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function initialize() {
    if (!profile) {
        console.error("Portfolio profile data is missing.");
        return;
    }

    renderHero();
    renderFocusAreas();
    renderProjects();
    renderResearch();
    renderExperience();
    renderEducation();
    renderAwards();
    renderPublications();
    renderContact();
    setupNavigation();
    setupReveal();
    setText("currentYear", new Date().getFullYear());
}

initialize();
