/**
 * Hilal Şuheda ESER — Core JavaScript Architecture
 * Interactive Canvas, Localization, Theme Engine,
 * Dynamic Renderers & Certificate PDF Viewer
 */

document.addEventListener("DOMContentLoaded", () => {

  const htmlRoot = document.documentElement;

  // ==========================================
  // 1. THEME MANAGEMENT
  // ==========================================

  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const getSavedTheme = () => {
    return localStorage.getItem("portfolio_theme") || "dark";
  };

  const applyTheme = (theme) => {

    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);

    if (themeToggleBtn) {

      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Aydınlık Mod" : "Karanlık Mod"
      );

      themeToggleBtn.innerHTML = theme === "dark"
        ? `
          <svg width="17" height="17"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">

            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>

          </svg>
        `
        : `
          <svg width="17" height="17"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">

            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>

          </svg>
        `;
    }
  };

  let currentTheme = getSavedTheme();

  applyTheme(currentTheme);

  if (themeToggleBtn) {

    themeToggleBtn.addEventListener("click", () => {

      currentTheme = currentTheme === "dark"
        ? "light"
        : "dark";

      applyTheme(currentTheme);

    });
  }


  // ==========================================
  // 2. LANGUAGE MANAGEMENT
  // ==========================================

  let currentLang = localStorage.getItem("portfolio_lang") || "tr";

  const setLanguage = (lang) => {

    currentLang = lang;

    localStorage.setItem("portfolio_lang", lang);

    htmlRoot.setAttribute("lang", lang);

    const data = translations[lang] || translations.tr;


    // SEO AND DOCUMENT TITLE

    document.title = data.meta.title;

    const metaDesc = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDesc) {
      metaDesc.setAttribute("content", data.meta.description);
    }

    const metaKeywords = document.querySelector(
      'meta[name="keywords"]'
    );

    if (metaKeywords) {
      metaKeywords.setAttribute("content", data.meta.keywords);
    }


    // TRANSLATE TEXT CONTENT

    document.querySelectorAll("[data-i18n]").forEach((el) => {

      const key = el.getAttribute("data-i18n");

      const val = getNestedVal(data, key);

      if (val !== undefined) {
        el.innerHTML = val;
      }

    });


    // TRANSLATE PLACEHOLDERS

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

      const key = el.getAttribute("data-i18n-placeholder");

      const val = getNestedVal(data, key);

      if (val !== undefined) {
        el.setAttribute("placeholder", val);
      }

    });


    // LANGUAGE BUTTONS

    document.querySelectorAll(".lang-seg-btn").forEach(btn => {

      const btnLang = btn.getAttribute("data-lang");

      if (btnLang === lang) {

        btn.classList.add("active");

      } else {

        btn.classList.remove("active");

      }

    });


    // DYNAMIC CONTENT

    renderEducation(data.education);

    renderExperience(data.experience.items);

    renderProjects(activeProjectFilter);

  };


  const getNestedVal = (obj, path) => {

    return path.split(".").reduce(
      (acc, part) => acc && acc[part],
      obj
    );

  };


  document.querySelectorAll(".lang-seg-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const targetLang = btn.getAttribute("data-lang");

      if (targetLang && targetLang !== currentLang) {

        setLanguage(targetLang);

      }

    });

  });


  // ==========================================
  // 3. INTERACTIVE CANVAS TABS
  // ==========================================

  const canvasTabBtns = document.querySelectorAll(".canvas-tab-btn");

  const tabPanes = document.querySelectorAll(".tab-pane");

  canvasTabBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      const targetTab = btn.getAttribute("data-tab");

      canvasTabBtns.forEach(b => {

        b.classList.remove("active");

      });

      tabPanes.forEach(pane => {

        pane.classList.remove("active");

      });

      btn.classList.add("active");

      const activePane = document.getElementById(
        `pane-${targetTab}`
      );

      if (activePane) {

        activePane.classList.add("active");

      }

    });

  });


  // ==========================================
  // 4. EDUCATION AND CERTIFICATES
  // ==========================================

  const renderEducation = (edu) => {

    const certsContainer = document.getElementById("certsContainer");

    if (!certsContainer || !edu || !edu.certs) return;


    const viewLabel = currentLang === "tr"
      ? "Sertifikayı Görüntüle"
      : "View Certificate";


    certsContainer.replaceChildren();


    edu.certs.forEach(c => {

      // PDF exists: clickable link
      // No PDF: normal certificate card

      const card = document.createElement(
        c.pdf ? "a" : "div"
      );

      card.className = "cert-card-row";

      card.style.gap = "12px";


      // OPEN PDF IN NEW TAB

      if (c.pdf) {

        card.href = c.pdf;

        card.target = "_blank";

        card.rel = "noopener noreferrer";

        card.style.cursor = "pointer";

        card.title = viewLabel;

      }


      // CERTIFICATE INFORMATION

      const info = document.createElement("div");

      info.style.display = "flex";

      info.style.flexDirection = "column";

      info.style.gap = "5px";

      info.style.minWidth = "0";


      // CERTIFICATE NAME

      const name = document.createElement("span");

      name.className = "cert-name";

      name.textContent = c.name;


      // ISSUER AND DATE

      const meta = document.createElement("span");

      meta.className = "cert-meta";

      meta.style.whiteSpace = "normal";

      meta.textContent = `${c.issuer} · ${c.date}`;


      info.append(name, meta);


      // VIEW CERTIFICATE LABEL

      if (c.pdf) {

        const label = document.createElement("span");

        label.style.fontSize = "0.75rem";

        label.style.color = "var(--text-muted)";

        label.textContent = viewLabel;

        info.appendChild(label);

      }


      card.appendChild(info);


      // EXTERNAL LINK ICON

      if (c.pdf) {

        const icon = document.createElement("span");

        icon.setAttribute("aria-hidden", "true");

        icon.style.color = "var(--text-muted)";

        icon.style.flexShrink = "0";

        icon.textContent = "↗";

        card.appendChild(icon);

      }


      certsContainer.appendChild(card);

    });

  };


  // ==========================================
  // 5. WORK EXPERIENCE
  // ==========================================

  const renderExperience = (items) => {

    const container = document.getElementById("experienceList");

    if (!container || !items) return;

    container.innerHTML = items.map(item => `

      <div class="timeline-block">

        <div class="timeline-date-row">

          <span>${item.period}</span>

        </div>

        <h3 class="timeline-title">

          ${item.role}

        </h3>

        <div class="timeline-subtitle">

          ${item.company} · ${item.location}

        </div>

        <p class="timeline-summary">

          ${item.summary}

        </p>

        <ul class="timeline-list">

          ${item.bullets.map(b => `<li>${b}</li>`).join("")}

        </ul>

      </div>

    `).join("");

  };


  // ==========================================
  // 6. PROJECTS
  // ==========================================

  let activeProjectFilter = "all";


  const renderProjects = (filter = "all") => {

    activeProjectFilter = filter;

    const container = document.getElementById("projectsContainer");

    if (!container) return;


    const data = translations[currentLang] || translations.tr;

    const items = data.projects.items;


    const filtered = filter === "all"

      ? items

      : items.filter(p => p.category === filter);


    container.innerHTML = filtered.map(item => `

      <div class="project-item-card">

        <div>

          <div class="project-card-top">

            <h3 class="project-title">

              ${item.title}

            </h3>

            <a href="${item.github}"
               target="_blank"
               rel="noopener noreferrer"
               class="project-gh-icon"
               aria-label="GitHub Repository"
               title="${data.projects.sourceBtn}">

              <svg width="18"
                   height="18"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   stroke-width="2"
                   stroke-linecap="round"
                   stroke-linejoin="round">

                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>

              </svg>

            </a>

          </div>

          <p class="project-description">

            ${item.desc}

          </p>

        </div>

        <div class="project-chips">

          ${item.stack.map(s => `
            <span class="chip">${s}</span>
          `).join("")}

        </div>

      </div>

    `).join("");

  };


  // PROJECT FILTER BUTTONS

  document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      document.querySelectorAll(".filter-btn").forEach(b => {

        b.classList.remove("active");

      });

      btn.classList.add("active");

      renderProjects(btn.getAttribute("data-filter"));

    });

  });


  // ==========================================
  // 7. TOAST NOTIFICATION
  // ==========================================

  const showToast = (msg) => {

    let toast = document.getElementById("toastNotice");

    if (!toast) {

      toast = document.createElement("div");

      toast.id = "toastNotice";

      toast.className = "toast-notice";

      document.body.appendChild(toast);

    }

    toast.textContent = msg;

    toast.classList.add("show");


    setTimeout(() => {

      toast.classList.remove("show");

    }, 2400);

  };


  // ==========================================
  // 8. CLIPBOARD
  // ==========================================

  window.copyText = (text, label) => {

    if (navigator.clipboard) {

      navigator.clipboard.writeText(text).then(() => {

        showToast(
          currentLang === "tr"
            ? `${label} kopyalandı!`
            : `${label} copied!`
        );

      });

    } else {

      showToast(text);

    }

  };


  // ==========================================
  // 9. CONTACT FORM
  // ==========================================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

      e.preventDefault();


      const name = document.getElementById("formName").value;

      const email = document.getElementById("formEmail").value;

      const msg = document.getElementById("formMsg").value;


      const mailto = `mailto:esersuheda03@gmail.com?subject=${encodeURIComponent("Portfolio Contact: " + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + msg)}`;


      window.location.href = mailto;


      showToast(
        currentLang === "tr"

          ? "E-posta uygulamanız açılıyor..."

          : "Opening mail client..."
      );


      contactForm.reset();

    });

  }


  // ==========================================
  // 10. MOBILE MENU
  // ==========================================

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const navMenu = document.getElementById("navMenu");


  if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener("click", () => {

      navMenu.classList.toggle("open");

    });


    document.querySelectorAll(".nav-link").forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

      });

    });

  }


  // ==========================================
  // 11. INITIALIZE WEBSITE
  // ==========================================

  setLanguage(currentLang);

});
