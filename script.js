// ---------------------------------------------------------------
// Boot -> Login -> Welcome -> Desktop sequence
// ---------------------------------------------------------------

// Mobile browsers change the visible viewport height when the address
// bar shows/hides, which breaks plain `100vh`. We measure the real
// available height in JS and expose it as a CSS variable instead.
function setAppHeight() {
    document.documentElement.style.setProperty("--app-height", window.innerHeight + "px");
}
setAppHeight();
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", () => setTimeout(setAppHeight, 250));

// True on phones/small tablets (matches the CSS mobile breakpoint).
function isMobileLayout() {
    return window.matchMedia("(max-width: 820px)").matches;
}

// Respecte le réglage "réduire les animations" du système.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const T = (ms) => (reduceMotion ? 0 : ms);

// Annonce un message aux lecteurs d'écran.
const announcer = document.getElementById("sr-announcer");
function announce(msg) {
    announcer.textContent = "";
    setTimeout(() => (announcer.textContent = msg), 50);
}

// Échappe le texte injecté dans du HTML (titres, descriptions...).
function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const loginCard = document.getElementById("login-card");
const loginFrame = document.querySelector(".xp-login-frame");
const welcomeText = document.getElementById("welcome-text");
const appShell = document.getElementById("app-shell");

// 1) Boot screen: shown for a bit, then fades into the login screen.
//    Un clic ou une touche permet de passer directement.
let bootDone = false;
function endBoot() {
    if (bootDone) return;
    bootDone = true;
    document.removeEventListener("keydown", endBoot);
    bootScreen.removeEventListener("click", endBoot);
    bootScreen.classList.add("fade-out");
    setTimeout(() => {
        bootScreen.style.display = "none";
        loginScreen.style.display = "flex";
        loginCard.focus();
    }, T(600)); // matches the CSS fade duration
}
setTimeout(endBoot, T(2600) || 300);
document.addEventListener("keydown", endBoot);
bootScreen.addEventListener("click", endBoot);

// 2) Click (or Enter/Space on) the user tile to "log in".
loginCard.addEventListener("click", logIn);

function logIn() {
    loginCard.disabled = true;
    loginFrame.classList.add("hide");

    setTimeout(() => welcomeText.classList.add("show"), T(400));

    setTimeout(() => {
        loginScreen.classList.add("fade-out");
        setTimeout(() => {
            loginScreen.style.display = "none";
            appShell.inert = false;
            appShell.classList.add("visible");
            const firstIcon = document.querySelector("#icons .icon");
            if (firstIcon) firstIcon.focus();
            announce("Session ouverte. Bureau de Neidjah ANICET.");
        }, T(600));
    }, T(1300));
}

// ---------------------------------------------------------------
// "My Projects" as a fake late-90s/2000s search engine.
// To add a project later, just add an object to PROJECTS below —
// everything else (rendering + search filter) is automatic.
// ---------------------------------------------------------------
const PROJECTS = [
    {
        title: "Affiche Evelynne Axell",
        url: "silly-os.local/portfolio/projets/affiche-axell",
        desc: "Affiche pour l'exposition fictive de Evelynne Axell au Musée d'art contemporain.",
        tags: ["Design", "Affiche", "Illustration"],
        image: "https://www.image-heberg.fr/files/17799349731072417184.png",
        link: "https://drive.google.com/file/d/11WxYHSJiqjsr2f_F0ArDcBD5uq_tXjYu/view?usp=sharing",
    },
    
 {
        title: "Affiche de concert Insane Clown Posse!",
        url: "silly-os.local/portfolio/projets/affiche-icp",
        desc: "Affiche pour le concert des Insane Clown Posse, dans le style Swissted.",
        tags: ["Design", "Affiche", "Illustration"],
        image: "https://www.image-heberg.fr/files/17722959451235490333.png",
        link: "https://www.image-heberg.fr/files/17722959451235490333.png",
    },
    
    {
        title: "Pub Flora Gucci",
        url: "silly-os.local/portfolio/projets/pub-flora",
        desc: "Un mockup fait en collaboration pour une publicité.",
        tags: ["Publicité", "Collaboratif"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373144-mockup.png",
        link: "https://drive.google.com/drive/folders/1LPzavSL3eCfmo5cXGz4ang-ZFnPsYqqe",
    },
    
     {
        title: "Noodles Studio",
        url: "silly-os.local/portfolio/projets/noodlez",
        desc: "Logo et charte graphique pour une marque fictive de vente de nouilles",
        tags: ["Design", "Logo","Branding"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373143-logo-noodles.png",
        link: "https://drive.google.com/drive/folders/13_zx-Mh8qHjlZWkhObGA_Y-iZBeem61A",
    },
    
         {
        title: "Silly Links",
        url: "silly-os.local/portfolio/projets/silly-links",
        desc: "Site personnel regroupant mes réseaux sociaux",
        tags: ["Design", "Projet perso","Branding","Web"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373880-pperso.png",
        link: "https://sillylinks.duckdns.org",
    },
    
             {
        title: "Project Mareis",
        url: "silly-os.local/portfolio/projets/mareis",
        desc: "Site pour une association fictive pour la protection maritime",
        tags: ["Collaboratif","Web"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788374110-site-maeries.jpg",
        link: "https://sallyanicet-gif.github.io/sae-1.05/",
    },
    
            {
        title: "An apple a day...",
        url: "silly-os.local/portfolio/projets/bad-apple",
        desc: "Une affiche réalisée avec Adobe Illustrator pour le single « An Apple a Day » de horsegiirL",
        tags: ["Projet perso","Design","Affiche"],
        image: "https://www.image-heberg.fr/files/17875409633740919566.png",
        link: "https://www.instagram.com/p/DcKomFHsXCh/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ==",
    }, 
    
              {
        title: "Affiche Baki",
        url: "silly-os.local/portfolio/projets/i-got-that-dawg-in-me",
        desc: "Une affiche réalisée sur Photoshop pour l'anime Baki (2018) sur Netflix",
        tags: ["Design","Affiche","Projet perso"],
        image: "https://www.image-heberg.fr/files/17875411362566168416.png",
        link: "https://www.instagram.com/p/DcZTJRdOOOO/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    },
    
                 {
        title: "Portrait Plastique",
        url: "silly-os.local/portfolio/projets/skull-but-inside",
        desc: "Montage Photoshop Créatif",
        tags: ["Design"],
        image: "https://www.image-heberg.fr/files/17722963212414680389.png",
        link: "https://www.image-heberg.fr/files/17722963212414680389.png",
    },
    
              {
        title: "Flyer BUT MMI",
        url: "silly-os.local/portfolio/projets/jpo-but",
        desc: "Flyer informationnel pour le BUT MMI",
        tags: ["Design"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788377831-flyer-illustratif.png",
        link: "https://image.noelshack.com/fichiers/2026/36/3/1788377831-flyer-illustratif.png",
    },
    
               {
        title: "Visuel Web Blackpink",
        url: "silly-os.local/portfolio/projets/blackpink-in-ur-area",
        desc: "Reproduction d'un visuel web de Blackpink",
        tags: ["Design","Affiche"],
        image: "https://image.noelshack.com/fichiers/2026/22/4/1779971044-ex15-01.jpg",
        link: "https://image.noelshack.com/fichiers/2026/22/4/1779971044-ex15-01.jpg",
    },
    
                   {
        title: "IMPT-Interview",
        url: "silly-os.local/portfolio/projets/impt",
        desc: "Direction artistique et gestion de projet.",
        tags: ["Branding","Audiovisuel"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373143-impt.png",
        link: "https://youtube.com/shorts/x1Lvlvfe02M?si=I-BWv-x-iVeFyxXD",
    },
    
           {
        title: "Scène d'horreur",
        url: "silly-os.local/portfolio/projets/boo",
        desc: "Scène d'une minute de film d'horreur",
        tags: ["Audiovisuel","Collaboratif"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788381636-film1.png",
        link: "https://youtu.be/Y85a9M9mVBk?si=g2D22JzZw5bBffQy",
    }, 
    // Ajoute d'autres projets ici, même format :
    // {
    //   title: "...",
    //   url: "silly-os.local/portfolio/projets/...",
    //   desc: "...",
    //   tags: ["...", "..."],
    //   image: "chemin/vers/image.png",
    //   link: "https://...",
    // },
];

const NEW_TAB = '<span class="sr-only"> (s\'ouvre dans un nouvel onglet)</span>';

function buildProjectResult(p) {
    const searchBlob = (p.title + " " + p.desc + " " + p.tags.join(" ")).toLowerCase();
    return `
    <li class="se-result" data-search="${esc(searchBlob)}">
      <div class="se-result-thumb"><img src="${esc(p.image)}" alt="" loading="lazy"></div>
      <div class="se-result-body">
        <h3 class="se-result-heading"><a href="${esc(p.link)}" target="_blank" rel="noopener noreferrer" class="se-result-title">${esc(p.title)}${NEW_TAB}</a></h3>
        <div class="se-result-url" aria-hidden="true">www.${esc(p.url)} <span class="se-cached">- En cache - Pages similaires</span></div>
        <p class="se-result-desc">${esc(p.desc)}</p>
        <ul class="se-result-tags" aria-label="Tags">${p.tags
            .map((t) => `<li><button type="button" class="se-tag" data-tag="${esc(t)}" aria-label="Filtrer par ${esc(t)}">#${esc(t)}</button></li>`)
            .join("")}</ul>
      </div>
    </li>
  `;
}

function buildProjectsWindowContent() {
    const results = PROJECTS.map(buildProjectResult).join("");
    return `
    <div class="se-shell">
      <div class="se-header">
        <h2 class="se-logo" aria-label="SillySearch!">
          <span style="color:#4285F4">S</span><span style="color:#EA4335">i</span><span style="color:#E8A600">l</span><span style="color:#4285F4">l</span><span style="color:#34A853">y</span><span style="color:#EA4335">S</span><span style="color:#E8A600">e</span><span style="color:#4285F4">a</span><span style="color:#34A853">r</span><span style="color:#EA4335">c</span><span style="color:#E8A600">h</span><span style="color:#333">!</span>
        </h2>
        <form class="se-searchbar" role="search" onsubmit="event.preventDefault(); filterProjects(this.q.value)">
          <label for="se-input" class="sr-only">Rechercher un projet ou un tag</label>
          <input type="search" id="se-input" name="q" class="se-input" placeholder="Rechercher un projet, un tag..." autocomplete="off" oninput="filterProjects(this.value)" />
          <button type="submit" class="se-btn">
            <img src="icons/Search.png" class="tb-icon" alt="" /> Rechercher
          </button>
        </form>
        <p class="se-stats" id="se-stats" aria-live="polite">Environ ${PROJECTS.length} résultat${PROJECTS.length > 1 ? "s" : ""} (0,04 seconde)</p>
      </div>
      <ul class="se-results" id="se-results" aria-label="Projets">
        ${results}
      </ul>
      <div class="se-noresults" id="se-noresults" hidden>
        Aucun document ne correspond aux termes de recherche.<br />Essayez « design », « affiche » ou « illustration ».
      </div>
    </div>
  `;
}

function filterProjects(query) {
    const q = query.trim().toLowerCase();
    const nodes = document.querySelectorAll("#se-results .se-result");
    let count = 0;
    nodes.forEach((node) => {
        const match = !q || node.dataset.search.includes(q);
        node.hidden = !match;
        if (match) count++;
    });
    const stats = document.getElementById("se-stats");
    const noResults = document.getElementById("se-noresults");
    if (stats) {
        stats.textContent =
            count > 0
                ? `Environ ${count} résultat${count > 1 ? "s" : ""} (0,0${Math.floor(Math.random() * 8) + 1} seconde)`
                : `0 résultat pour « ${query} »`;
    }
    if (noResults) noResults.hidden = count !== 0;
}

// Clic sur un #tag = recherche sur ce tag.
document.addEventListener("click", (e) => {
    const tag = e.target.closest(".se-tag");
    if (!tag) return;
    const input = document.getElementById("se-input");
    input.value = tag.dataset.tag;
    filterProjects(tag.dataset.tag);
    input.focus();
});

// ---------------------------------------------------------------
// App registry: define your "windows" here. This is the only part
// you need to touch to add real content later.
// ---------------------------------------------------------------
const APPS = {
    about: {
        title: "About Me",
        glyph: "icons/aboutme.png",
        color: "#3a6ea5",
        width: 620,
        height: 440,
        explorerChrome: true,
        sidebar: `
      <section class="sidebar-section" aria-labelledby="sb-social">
        <h3 class="sidebar-title" id="sb-social">Social Links</h3>
        <ul class="sidebar-list">
          <li><a href="https://www.instagram.com/a_neidjah/" target="_blank" rel="noopener noreferrer">Instagram${NEW_TAB}</a></li>
          <li><a href="https://sillylinks.duckdns.org" target="_blank" rel="noopener noreferrer">Webcard${NEW_TAB}</a></li>
        </ul>
      </section>
      <section class="sidebar-section" aria-labelledby="sb-skills">
        <h3 class="sidebar-title" id="sb-skills">Skills</h3>
        <ul class="sidebar-list">
          <li>Graphic Design</li>
          <li>Web Design</li>
          <li>UX/UI Design</li>
          <li>Dessin Digital</li>
          <li>HTML</li>
        </ul>
      </section>
      <section class="sidebar-section" aria-labelledby="sb-software">
        <h3 class="sidebar-title" id="sb-software">Software</h3>
        <ul class="sidebar-list">
          <li>Adobe CC</li>
          <li>VS Code</li>
          <li>Figma</li>
          <li>Clip Studio Paint</li>
          <li>Procreate</li>
        </ul>
      </section>
    `,
        content: `
      <div>
        <h2 style="margin-top:0;">About Me</h2>
        <img src="icons/pfp.png" alt="Photo de Neidjah ANICET" class="about-photo">
        <p>Passionnée par le design et le développement web, je combine créativité et rigueur technique pour donner vie à des projets qui ont du sens. Mon objectif : créer des solutions élégantes qui résolvent de vrais problèmes.</p>
        <p>Entre deux projets, on me trouve en train d'explorer les dernières tendances design ou de peaufiner une illustration digitale.</p>
        <p>Côté détente, je suis fan de MOBA (League of Legends) et de jeux plus posés comme Stardew Valley et je stream tout ça sur Twitch, où j'essaie petit à petit de faire grandir ma communauté.</p>
      </div>
    `,
    },
    projects: {
        title: "My Projects",
        glyph: "icons/IE6.png",
        color: "#c98a2b",
        width: 560,
        height: 500,
        content: buildProjectsWindowContent(),
    },
    contact: {
        title: "Contact Me",
        glyph: "icons/Email.png",
        color: "#3f9b3f",
        width: 360,
        height: 440,
        content: `
      <form class="contact-form" onsubmit="handleContactForm(event, this)" novalidate>
        <p class="contact-required-hint">Tous les champs sont obligatoires.</p>
        <div class="contact-field">
          <label for="c-name">Nom</label>
          <input type="text" id="c-name" name="name" autocomplete="name" required />
        </div>
        <div class="contact-field">
          <label for="c-email">Email</label>
          <input type="email" id="c-email" name="email" autocomplete="email" inputmode="email" required aria-describedby="c-email-hint" />
          <span id="c-email-hint" class="contact-hint">Exemple : prenom.nom@mail.com</span>
        </div>
        <div class="contact-field">
          <label for="c-message">Message</label>
          <textarea id="c-message" name="message" rows="4" required minlength="10" aria-describedby="c-message-hint"></textarea>
          <span id="c-message-hint" class="contact-hint">10 caractères minimum.</span>
        </div>
        <div class="contact-status" role="status" aria-live="polite"></div>
        <div class="contact-actions">
          <button type="submit" class="btn">Envoyer</button>
        </div>
        <p class="contact-alt">
          Ou écrivez directement à <a href="mailto:neidjah.anicet@gmail.com">neidjah.anicet@gmail.com</a>
        </p>
      </form>
    `,
    },
    curryvital: {
        title: "My Resume",
        glyph: "icons/Generic Text Document.png",
        color: "#3f9b3f",
        width: 620,
        height: 520,
        content: `
      <div class="resume-toolbar" role="toolbar" aria-label="Actions du CV">
        <button type="button" class="tb-btn" id="resume-zoom" aria-pressed="false" onclick="toggleResumeZoom(this)">
          <img src="icons/Search.png" class="tb-icon" alt=""> Zoom
        </button>
        <a class="tb-btn" href="pdf/CV_ANICET_Neidjah.pdf" target="_blank" rel="noopener noreferrer">
          <img src="icons/Open.png" class="tb-icon" alt=""> Ouvrir le PDF${NEW_TAB}
        </a>
        <a class="tb-btn" href="pdf/CV_ANICET_Neidjah.pdf" download="CV_ANICET_Neidjah.pdf">
          <img src="icons/SDCard.png" class="tb-icon" alt=""> Télécharger
        </a>
        <button type="button" class="tb-btn" onclick="openWindow('contact')">
          <img src="icons/Email.png" class="tb-icon" alt=""> Contact Me
        </button>
      </div>
      <div class="resume-scroll" tabindex="0" aria-label="Aperçu du CV (faire défiler)">
        <img id="resumeImg" src="pdf/CV_ANICET_Neidjah.png" alt="CV de Neidjah ANICET. Version texte lisible disponible avec le bouton « Ouvrir le PDF »." class="resume-img">
      </div>
    `,
    },
};

// ---------------------------------------------------------------
// Resume zoom + Contact form (Formspree AJAX)
// ---------------------------------------------------------------
function toggleResumeZoom(btn) {
    const img = document.getElementById("resumeImg");
    const zoomed = img.classList.toggle("zoomed");
    if (btn) btn.setAttribute("aria-pressed", String(zoomed));
}

function handleContactForm(e, form) {
    e.preventDefault();
    const status = form.querySelector(".contact-status");
    status.className = "contact-status";
    status.textContent = "";

    // Validation avec messages clairs, et focus sur le premier champ en erreur.
    const fields = [...form.querySelectorAll("input, textarea")];
    let firstInvalid = null;
    fields.forEach((f) => {
        const ok = f.checkValidity();
        f.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) {
        const label = form.querySelector(`label[for="${firstInvalid.id}"]`).textContent;
        let why = "est obligatoire";
        if (firstInvalid.validity.typeMismatch) why = "n'est pas une adresse email valide";
        else if (firstInvalid.validity.tooShort) why = "doit contenir au moins 10 caractères";
        status.textContent = `Le champ « ${label} » ${why}.`;
        status.classList.add("error");
        firstInvalid.focus();
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Envoi...";

    fetch("https://formspree.io/f/mykbgjzo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
    })
        .then((res) => {
            if (!res.ok) throw new Error("Server error");
            status.textContent = "Message envoyé ! Merci 👻";
            status.classList.add("success");
            form.reset();
            fields.forEach((f) => f.removeAttribute("aria-invalid"));
        })
        .catch(() => {
            status.textContent = "Oups, une erreur est survenue. Réessayez ou écrivez par email.";
            status.classList.add("error");
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = "Envoyer";
        });
}

// ---------------------------------------------------------------
// Desktop, windows, taskbar
// ---------------------------------------------------------------
const desktopIcons = document.getElementById("icons");
const taskbarItems = document.getElementById("taskbar-items");
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");
const desktop = document.getElementById("desktop");
const taskbar = document.getElementById("taskbar");

let zCounter = 10;
let openWindows = {}; // id -> { el, taskEl, minimized, opener }
let winCounter = 0;
let offsetCascade = 0;

// Build desktop icons from APPS (de vrais boutons : clic, Entrée, Espace)
Object.entries(APPS).forEach(([id, app]) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <button type="button" class="icon" data-app="${id}">
      <span class="glyph"><img src="${app.glyph}" class="icon-img" alt=""></span>
      <span class="label">${esc(app.title)}</span>
    </button>
  `;
    li.querySelector("button").addEventListener("click", () => openWindow(id));
    desktopIcons.appendChild(li);
});

// Flèches du clavier pour passer d'une icône à l'autre.
desktopIcons.addEventListener("keydown", (e) => {
    const icons = [...desktopIcons.querySelectorAll(".icon")];
    const i = icons.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = icons[(i + 1) % icons.length];
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = icons[(i - 1 + icons.length) % icons.length];
    if (e.key === "Home") next = icons[0];
    if (e.key === "End") next = icons[icons.length - 1];
    if (next) {
        e.preventDefault();
        next.focus();
    }
});

// Builds the File-Explorer-style chrome. Les éléments purement décoratifs
// (menus factices, barre d'adresse) sont cachés aux lecteurs d'écran.
function explorerChromeMarkup(app) {
    const sidebar = app.sidebar || "";
    return `
    <div class="explorer-menubar" aria-hidden="true">
      <span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span>
    </div>
    <div class="explorer-toolbar" role="toolbar" aria-label="Raccourcis">
      <button type="button" class="tb-btn" disabled><img src="icons/Back.png" class="tb-icon" alt=""> Back</button>
      <button type="button" class="tb-btn" disabled><img src="icons/Forward.png" class="tb-icon" alt=""> Forward</button>
      <div class="sep" aria-hidden="true"></div>
      <button type="button" class="tb-btn" onclick="openWindow('projects')"><img src="icons/IE6.png" class="tb-icon" alt=""> My Projects</button>
      <button type="button" class="tb-btn" onclick="openWindow('curryvital')"><img src="icons/Generic Text Document.png" class="tb-icon" alt=""> My Resume</button>
    </div>
    <div class="explorer-addressbar" aria-hidden="true">
      <span class="addr-label">Address</span>
      <div class="addr-field"><img src="${app.glyph}" alt=""> ${esc(app.title)} <span class="addr-caret">&#9660;</span></div>
      <div class="go-btn"><img src="icons/Go.png" class="go-icon" alt=""> Go</div>
    </div>
    <div class="explorer-body">
      <div class="explorer-main window-body${app.darkContent ? " dark-content" : ""}">${app.content}</div>
      ${sidebar ? `<aside class="explorer-sidebar" aria-label="Infos">${sidebar}</aside>` : ""}
    </div>
    <div class="status-bar" aria-hidden="true">
      <p class="status-bar-field">Ready</p>
    </div>
  `;
}

// XP.css title bar. XP.css dessine les boutons d'après aria-label
// ("Minimize"/"Maximize"/"Close"), donc on le garde, et on donne le nom
// français aux lecteurs d'écran via aria-labelledby (prioritaire).
function titleBarMarkup(app, winId) {
    return `
    <div class="title-bar">
      <div class="title-bar-text" id="${winId}-title"><img src="${app.glyph}" class="title-icon" alt=""> ${esc(app.title)}</div>
      <div class="title-bar-controls">
        <span class="sr-only" id="${winId}-min">Réduire</span>
        <span class="sr-only" id="${winId}-max">Agrandir</span>
        <span class="sr-only" id="${winId}-close">Fermer</span>
        <button type="button" aria-label="Minimize" aria-labelledby="${winId}-min" title="Réduire"></button>
        <button type="button" aria-label="Maximize" aria-labelledby="${winId}-max" title="Agrandir"></button>
        <button type="button" aria-label="Close" aria-labelledby="${winId}-close" title="Fermer (Échap)"></button>
      </div>
    </div>
  `;
}

function findWindowId(appId) {
    return Object.keys(openWindows).find((k) => k.startsWith(appId + "__"));
}

function openWindow(appId) {
    const opener = document.activeElement;
    const existingId = findWindowId(appId);
    if (existingId) {
        restoreWindow(existingId);
        focusWindow(existingId, true);
        return;
    }

    const app = APPS[appId];
    const winId = appId + "__" + winCounter++;
    const win = document.createElement("section");
    // "xp-window" handles position/drag/resize behavior (custom),
    // "window" is the XP.css class that draws the actual chrome.
    win.className = "xp-window window";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-labelledby", winId + "-title");
    win.tabIndex = -1;

    // Taille adaptée à l'écran : jamais plus grande que la zone disponible.
    const availW = window.innerWidth - 20;
    const availH = window.innerHeight - taskbar.offsetHeight - 20;
    const w = Math.min(app.width, availW);
    const h = Math.min(app.height, availH);
    win.style.width = w + "px";
    win.style.height = h + "px";
    win.style.left = Math.max(0, Math.min(60 + offsetCascade, availW - w)) + "px";
    win.style.top = Math.max(0, Math.min(50 + offsetCascade, availH - h)) + "px";
    offsetCascade = (offsetCascade + 28) % 140;
    win.style.zIndex = ++zCounter;

    win.innerHTML = `
    ${titleBarMarkup(app, winId)}
    ${app.explorerChrome ? explorerChromeMarkup(app) : `<div class="window-body">${app.content}</div>`}
    <div class="resize-handle" aria-hidden="true"></div>
  `;
    desktop.appendChild(win);

    const taskEl = document.createElement("button");
    taskEl.type = "button";
    taskEl.className = "task-item active";
    taskEl.innerHTML = `<img src="${app.glyph}" class="task-icon" alt=""> <span class="task-label">${esc(app.title)}</span>`;
    taskbarItems.appendChild(taskEl);

    openWindows[winId] = { el: win, taskEl, minimized: false, opener };

    // Wire up interactions
    if (!isMobileLayout()) {
        makeDraggable(win, win.querySelector(".title-bar"));
        makeResizable(win, win.querySelector(".resize-handle"));
    }

    win.addEventListener("pointerdown", () => focusWindow(winId));
    win.addEventListener("focusin", () => {
        if (!isActive(winId)) focusWindow(winId);
    });
    // Double-clic sur la barre de titre = agrandir / restaurer (comme sous XP).
    win.querySelector(".title-bar").addEventListener("dblclick", (e) => {
        if (!e.target.closest("button")) toggleMaximize(win);
    });

    taskEl.addEventListener("click", () => {
        if (openWindows[winId].minimized) {
            restoreWindow(winId);
        } else if (isActive(winId)) {
            minimizeWindow(winId);
            return; // ne pas re-focus une fenêtre qu'on vient de réduire
        }
        focusWindow(winId, true);
    });

    win.querySelector('.title-bar-controls button[aria-label="Minimize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        minimizeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Close"]').addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Maximize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMaximize(win);
    });

    focusWindow(winId, true);
    announce(`Fenêtre ${app.title} ouverte.`);
}

function isActive(winId) {
    return openWindows[winId].el.classList.contains("active");
}

// moveFocus = true : le focus clavier va dans la fenêtre (ouverture,
// clic dans la barre des tâches).
function focusWindow(winId, moveFocus = false) {
    Object.entries(openWindows).forEach(([id, w]) => {
        const active = id === winId;
        w.el.classList.toggle("active", active);
        w.taskEl.classList.toggle("active", active);
        w.taskEl.setAttribute("aria-pressed", String(active));
        // XP.css dims the title bar via the "inactive" class on .title-bar
        w.el.querySelector(".title-bar").classList.toggle("inactive", !active);
    });
    const w = openWindows[winId];
    w.el.style.zIndex = ++zCounter;
    if (moveFocus) {
        const target =
            ["input", "h2", "a", "button"].map((sel) => w.el.querySelector(".window-body " + sel)).find(Boolean) || w.el;
        if (target.tagName === "H2") target.tabIndex = -1;
        target.focus({ preventScroll: true });
    }
}

function minimizeWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.add("minimized");
    w.minimized = true;
    w.el.classList.remove("active");
    w.taskEl.classList.remove("active");
    w.taskEl.setAttribute("aria-pressed", "false");
    w.taskEl.focus();
}

function restoreWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.remove("minimized");
    w.minimized = false;
}

function closeWindow(winId) {
    const w = openWindows[winId];
    w.el.remove();
    w.taskEl.remove();
    delete openWindows[winId];
    // Rendre le focus à ce qui avait ouvert la fenêtre (icône, menu...).
    const back =
        w.opener && document.body.contains(w.opener) && !w.opener.closest("#start-menu")
            ? w.opener
            : document.querySelector("#icons .icon");
    if (back) back.focus();
}

function toggleMaximize(win) {
    const btn = win.querySelector('.title-bar-controls button[aria-label="Maximize"]');
    if (win.dataset.maxed === "1") {
        win.style.width = win.dataset.prevW;
        win.style.height = win.dataset.prevH;
        win.style.left = win.dataset.prevL;
        win.style.top = win.dataset.prevT;
        win.dataset.maxed = "0";
        btn.title = "Agrandir";
    } else {
        win.dataset.prevW = win.style.width;
        win.dataset.prevH = win.style.height;
        win.dataset.prevL = win.style.left;
        win.dataset.prevT = win.style.top;
        win.style.width = "100%";
        win.style.height = `calc(var(--app-height, 100vh) - ${taskbar.offsetHeight}px)`;
        win.style.left = "0px";
        win.style.top = "0px";
        win.dataset.maxed = "1";
        btn.title = "Restaurer";
    }
}

// Échap ferme le menu Démarrer s'il est ouvert, sinon la fenêtre active.
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !appShell.classList.contains("visible")) return;
    if (!startMenu.hidden) {
        closeStartMenu(true);
        return;
    }
    const activeId = Object.keys(openWindows).find((id) => isActive(id) && !openWindows[id].minimized);
    // Pas pendant la saisie, pour ne pas perdre un message en cours.
    if (document.activeElement.matches("input, textarea")) return;
    if (activeId && openWindows[activeId].el.contains(document.activeElement)) closeWindow(activeId);
});

// ---------------------------------------------------------------
// Drag / resize (pointer events : souris, stylet et tactile)
// ---------------------------------------------------------------
function clampToViewport(win) {
    const maxL = window.innerWidth - 80; // garder au moins 80px visibles
    const maxT = window.innerHeight - taskbar.offsetHeight - 30;
    win.style.left = Math.min(Math.max(-win.offsetWidth + 80, win.offsetLeft), maxL) + "px";
    win.style.top = Math.min(Math.max(0, win.offsetTop), maxT) + "px";
}

function makeDraggable(win, handle) {
    let startX, startY, startLeft, startTop;
    handle.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || e.target.closest("button") || win.dataset.maxed === "1") return;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;
        handle.setPointerCapture(e.pointerId);
        e.preventDefault();
    });
    handle.addEventListener("pointermove", (e) => {
        if (!handle.hasPointerCapture(e.pointerId)) return;
        win.style.left = startLeft + (e.clientX - startX) + "px";
        win.style.top = startTop + (e.clientY - startY) + "px";
        clampToViewport(win);
    });
    handle.addEventListener("pointerup", (e) => handle.releasePointerCapture(e.pointerId));
}

function makeResizable(win, handle) {
    let startX, startY, startW, startH;
    handle.addEventListener("pointerdown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startW = win.offsetWidth;
        startH = win.offsetHeight;
        handle.setPointerCapture(e.pointerId);
        e.stopPropagation();
        e.preventDefault();
    });
    handle.addEventListener("pointermove", (e) => {
        if (!handle.hasPointerCapture(e.pointerId)) return;
        win.style.width = Math.max(260, startW + (e.clientX - startX)) + "px";
        win.style.height = Math.max(160, startH + (e.clientY - startY)) + "px";
    });
    handle.addEventListener("pointerup", (e) => handle.releasePointerCapture(e.pointerId));
}

// Si la fenêtre du navigateur rétrécit, ramener les fenêtres dans l'écran.
window.addEventListener("resize", () => {
    Object.values(openWindows).forEach((w) => {
        if (w.el.dataset.maxed !== "1") clampToViewport(w.el);
    });
});

// ---------------------------------------------------------------
// Start menu (clavier : Entrée/Espace pour ouvrir, flèches, Échap)
// ---------------------------------------------------------------
function startMenuItems() {
    return [...startMenu.querySelectorAll(".sm-item, .sm-footer-btn")];
}

function openStartMenu() {
    startMenu.hidden = false;
    startBtn.classList.add("open");
    startBtn.setAttribute("aria-expanded", "true");
    startMenuItems()[0].focus();
}

function closeStartMenu(returnFocus = false) {
    startMenu.hidden = true;
    startBtn.classList.remove("open");
    startBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) startBtn.focus();
}

startBtn.addEventListener("click", () => (startMenu.hidden ? openStartMenu() : closeStartMenu()));

startMenu.addEventListener("keydown", (e) => {
    const items = startMenuItems();
    const i = items.indexOf(document.activeElement);
    let next = null;
    if (e.key === "ArrowDown") next = items[(i + 1) % items.length];
    if (e.key === "ArrowUp") next = items[(i - 1 + items.length) % items.length];
    if (e.key === "Home") next = items[0];
    if (e.key === "End") next = items[items.length - 1];
    if (next) {
        e.preventDefault();
        next.focus();
    }
});

// Fermer le menu si on clique ailleurs ou si le focus clavier en sort.
document.addEventListener("click", (e) => {
    if (!startMenu.hidden && !startMenu.contains(e.target) && !startBtn.contains(e.target)) closeStartMenu();
});
startMenu.addEventListener("focusout", (e) => {
    if (e.relatedTarget && !startMenu.contains(e.relatedTarget) && e.relatedTarget !== startBtn) closeStartMenu();
});

startMenu.querySelectorAll(".sm-item[data-open]").forEach((item) => {
    item.addEventListener("click", () => {
        closeStartMenu();
        openWindow(item.dataset.open);
    });
});

// "Fermer la session" sends you back to the login screen, XP-style.
document.getElementById("sm-logoff").addEventListener("click", () => {
    closeStartMenu();
    appShell.classList.remove("visible");
    appShell.inert = true;
    loginScreen.style.display = "flex";
    loginScreen.classList.remove("fade-out");
    loginFrame.classList.remove("hide");
    welcomeText.classList.remove("show");
    loginCard.disabled = false;
    loginCard.focus();
    announce("Session fermée.");
});

// "Arrêter" : on tente de fermer l'onglet. Les navigateurs n'autorisent
// window.close() que sur un onglet ouvert par un script ; sinon l'appel est
// ignoré, et on affiche à la place un écran d'arrêt façon XP.
const shutdownScreen = document.getElementById("shutdown-screen");
const shutdownMsg = document.getElementById("shutdown-msg");

function shutDown() {
    closeStartMenu();
    appShell.inert = true;
    loginScreen.inert = true;

    shutdownMsg.textContent = "Au revoir !";
    shutdownScreen.style.display = "flex";
    shutdownScreen.focus();

    setTimeout(() => {
        window.close();
        // Si on est encore là 300 ms plus tard, le navigateur a refusé.
        setTimeout(() => {
            if (!window.closed) {
                shutdownMsg.innerHTML =
                    "Vous pouvez maintenant fermer cet onglet en toute sécurité." +
                    '<br><button type="button" class="shutdown-restart">Redémarrer Silly OS</button>';
                const restart = shutdownMsg.querySelector(".shutdown-restart");
                restart.addEventListener("click", () => location.reload());
                restart.focus();
            }
        }, 300);
    }, T(1500) || 300);
}

document.getElementById("sm-shutdown").addEventListener("click", shutDown);
// Le bouton "Arrêter l'ordinateur" de l'écran de connexion fait la même chose.
document.querySelector(".xp-poweroff").addEventListener("click", shutDown);

// ---------------------------------------------------------------
// Clock
// ---------------------------------------------------------------
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    clock.textContent = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    clock.title = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
updateClock();
setInterval(updateClock, 1000 * 10);
