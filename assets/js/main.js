/**
 * ============================================================
 *  main.js — Motor de la plantilla
 * ============================================================
 * No suele hacer falta tocar este archivo para personalizar un
 * cliente: todos los datos salen de config.js. Este script solo
 * vuelca esos datos en el HTML.
 * ============================================================
 */
(function () {
  "use strict";

  if (typeof CONFIG === "undefined") {
    console.error("No se ha encontrado CONFIG. Revisa que config.js esté cargado antes que main.js.");
    return;
  }

  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------
     1. COLORES (variables CSS) — aplicar cuanto antes
  --------------------------------------------------------- */
  function applyTheme() {
    var t = CONFIG.theme || {};
    var root = document.documentElement.style;
    if (t.primaryColor) root.setProperty("--primary", t.primaryColor);
    if (t.primaryDark) root.setProperty("--primary-dark", t.primaryDark);
    if (t.secondaryColor) root.setProperty("--secondary", t.secondaryColor);
    if (t.darkColor) root.setProperty("--dark", t.darkColor);
    if (t.lightColor) root.setProperty("--light", t.lightColor);
    if (t.whatsappColor) root.setProperty("--whatsapp", t.whatsappColor);
    if (t.fontFamily) root.setProperty("--font-family", t.fontFamily);
    if (t.headingFontFamily) root.setProperty("--heading-font", t.headingFontFamily);
  }

  /* ---------------------------------------------------------
     2. SEO: title, meta description, canonical, Open Graph
  --------------------------------------------------------- */
  function applySEO() {
    var seo = CONFIG.seo || {};
    var biz = CONFIG.business || {};

    if (seo.title) document.title = seo.title;

    setMeta('meta[name="description"]', "content", seo.description || "");
    setMeta('meta[name="keywords"]', "content", seo.keywords || "");
    setMeta('meta[property="og:title"]', "content", seo.title || biz.name || "");
    setMeta('meta[property="og:description"]', "content", seo.description || "");
    setMeta('meta[property="og:image"]', "content", seo.ogImage || "");

    if (seo.siteUrl) {
      setMeta('meta[property="og:url"]', "content", seo.siteUrl, true, "property");
      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", seo.siteUrl);
    }

    var images = CONFIG.images || {};
    if (images.favicon) {
      var favicon = document.getElementById("favicon-link");
      if (favicon) favicon.setAttribute("href", images.favicon);
    }

    injectStructuredData();
  }

  function setMeta(selector, attr, value, create, keyAttr) {
    var el = document.querySelector(selector);
    if (!el && create) {
      el = document.createElement("meta");
      el.setAttribute(keyAttr || "name", selector.match(/["'](.+)["']/)[1]);
      document.head.appendChild(el);
    }
    if (el) el.setAttribute(attr, value);
  }

  function injectStructuredData() {
    var biz = CONFIG.business || {};
    var loc = CONFIG.location || {};
    var contact = CONFIG.contact || {};
    var seo = CONFIG.seo || {};

    var data = {
      "@context": "https://schema.org",
      "@type": biz.schemaType || "LocalBusiness",
      "name": biz.name || "",
      "description": seo.description || biz.tagline || "",
      "image": seo.ogImage || "",
      "telephone": contact.phone || "",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": loc.address || "",
        "addressLocality": biz.town || "",
        "addressRegion": biz.province || "",
        "addressCountry": "ES"
      }
    };
    if (seo.siteUrl) data.url = seo.siteUrl;

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ---------------------------------------------------------
     3. HEADER / LOGO / NAV
  --------------------------------------------------------- */
  function renderHeader() {
    var biz = CONFIG.business || {};
    var images = CONFIG.images || {};

    $("brand-name").textContent = biz.name || "";

    if (images.logo) {
      var logo = $("brand-logo");
      logo.src = images.logo;
      logo.alt = biz.name || "Logo";
      logo.hidden = false;
    }

    var servicesLink = $("nav-servicios-link");
    if (servicesLink && CONFIG.servicesSection && CONFIG.servicesSection.sectionTitle) {
      servicesLink.textContent = CONFIG.servicesSection.sectionTitle;
    }

    var toggle = $("navToggle");
    var nav = $("siteNav");
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     4. HERO
  --------------------------------------------------------- */
  function renderHero() {
    var hero = CONFIG.hero || {};
    var images = CONFIG.images || {};

    $("hero-title").textContent = hero.title || "";
    $("hero-subtitle").textContent = hero.subtitle || "";

    var cta = $("hero-cta");
    if (hero.ctaText) {
      cta.textContent = hero.ctaText;
      cta.href = hero.ctaLink || "carta.html";
    } else {
      cta.hidden = true;
    }

    var ctaSec = $("hero-cta-secondary");
    if (hero.ctaSecondaryText) {
      ctaSec.textContent = hero.ctaSecondaryText;
      ctaSec.href = hero.ctaSecondaryLink || "#ubicacion";
    } else {
      ctaSec.hidden = true;
    }

    var heroSection = $("hero");
    if (images.heroImage) {
      heroSection.style.backgroundImage = "url('" + images.heroImage + "')";
    }
    var opacity = images.heroOverlayOpacity;
    heroSection.style.setProperty("--hero-scrim-opacity", opacity === undefined ? 0.35 : opacity);
  }

  /* ---------------------------------------------------------
     5. SERVICIOS / MENÚ (avance en la portada)
  --------------------------------------------------------- */
  // La carta completa vive en carta.html. Aquí solo se muestra un avance:
  // una tarjeta por categoría que enlaza directo a carta.html#<slug>.
  function renderServices() {
    var section = CONFIG.servicesSection || {};
    $("services-title").textContent = section.sectionTitle || "Servicios";
    $("services-subtitle").textContent = section.sectionSubtitle || "";

    var wrap = $("services-grid");
    wrap.innerHTML = "";

    (section.categories || []).forEach(function (cat) {
      var card = document.createElement("a");
      card.className = "menu-card";
      card.href = "carta.html#" + (cat.slug || "");

      var imgWrap = document.createElement("div");
      imgWrap.className = "menu-card-image";
      if (cat.image) {
        var img = document.createElement("img");
        img.src = cat.image;
        img.alt = cat.name || "";
        img.loading = "lazy";
        imgWrap.appendChild(img);
      }
      card.appendChild(imgWrap);

      var name = document.createElement("span");
      name.className = "menu-card-name";
      name.textContent = cat.name || "";
      card.appendChild(name);

      wrap.appendChild(card);
    });

    var viewAll = $("services-viewall");
    if (section.viewAllText) {
      viewAll.textContent = section.viewAllText;
    } else {
      viewAll.hidden = true;
    }
  }

  /* ---------------------------------------------------------
     6. HORARIO
  --------------------------------------------------------- */
  function renderSchedule() {
    var schedule = CONFIG.schedule || {};
    $("schedule-title").textContent = schedule.sectionTitle || "Horario";
    $("schedule-note").textContent = schedule.note || "";

    var body = $("schedule-body");
    body.innerHTML = "";

    (schedule.days || []).forEach(function (day) {
      var tr = document.createElement("tr");
      var isClosed = /cerrado/i.test(day.hours || "");
      if (isClosed) tr.className = "closed";

      var tdLabel = document.createElement("td");
      tdLabel.textContent = day.label || "";
      var tdHours = document.createElement("td");
      tdHours.textContent = day.hours || "";

      tr.appendChild(tdLabel);
      tr.appendChild(tdHours);
      body.appendChild(tr);
    });
  }

  /* ---------------------------------------------------------
     7. UBICACIÓN
  --------------------------------------------------------- */
  function renderLocation() {
    var loc = CONFIG.location || {};
    $("location-title").textContent = loc.sectionTitle || "Ubicación";
    $("location-address").textContent = loc.address || "";

    var iframe = $("map-embed");
    if (loc.mapEmbedUrl) iframe.src = loc.mapEmbedUrl;

    var btn = $("location-directions-btn");
    btn.href = loc.mapLinkUrl || loc.mapEmbedUrl || "#";
  }

  /* ---------------------------------------------------------
     8. CONTACTO Y REDES
  --------------------------------------------------------- */
  var SOCIAL_ICONS = {
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.91c0-2.39 1.42-3.71 3.6-3.71 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2h-3v13.5a2.5 2.5 0 1 1-2.5-2.5c.2 0 .4 0 .6.05V9.9a5.6 5.6 0 0 0-.6-.03A5.6 5.6 0 1 0 16.5 15.5V8.3a7.4 7.4 0 0 0 4.5 1.5V6.8a4.4 4.4 0 0 1-4.5-4.5Z"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-6.9L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.3L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z"/></svg>',
  };

  function renderContact() {
    var contact = CONFIG.contact || {};

    var phoneCard = $("contact-phone");
    if (contact.phone) {
      phoneCard.href = "tel:" + (contact.phoneLink || contact.phone);
      $("contact-phone-text").textContent = contact.phone;
    } else {
      phoneCard.hidden = true;
    }

    var waCard = $("contact-whatsapp");
    var waUrl = buildWhatsAppUrl(contact);
    if (contact.whatsapp) {
      waCard.href = waUrl;
    } else {
      waCard.hidden = true;
    }

    var emailCard = $("contact-email");
    if (contact.email) {
      emailCard.href = "mailto:" + contact.email;
      $("contact-email-text").textContent = contact.email;
    } else {
      emailCard.hidden = true;
    }

    var socialWrap = $("social-links");
    socialWrap.innerHTML = "";
    var social = contact.social || {};
    Object.keys(social).forEach(function (key) {
      var url = social[key];
      if (!url) return;
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", key);
      a.innerHTML = SOCIAL_ICONS[key] || key.charAt(0).toUpperCase();
      socialWrap.appendChild(a);
    });

    var floatBtn = $("whatsapp-float");
    if (contact.whatsapp) {
      floatBtn.href = waUrl;
    } else {
      floatBtn.hidden = true;
    }
  }

  function buildWhatsAppUrl(contact) {
    var msg = encodeURIComponent(contact.whatsappDefaultMessage || "Hola, quería hacer una consulta");
    return "https://wa.me/" + contact.whatsapp + "?text=" + msg;
  }

  /* ---------------------------------------------------------
     9. FOOTER
  --------------------------------------------------------- */
  function renderFooter() {
    var footer = CONFIG.footer || {};
    $("footer-text").textContent = footer.text || "";

    var credit = $("footer-credit");
    if (footer.showCredit && footer.creditText) {
      if (footer.creditLink) {
        var a = document.createElement("a");
        a.href = footer.creditLink;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = footer.creditText;
        credit.appendChild(a);
      } else {
        credit.textContent = footer.creditText;
      }
    } else {
      credit.hidden = true;
    }
  }

  /* ---------------------------------------------------------
     10. ANIMACIONES AL HACER SCROLL
  --------------------------------------------------------- */
  function initScrollReveal() {
    var selectors = [
      ".section h2",
      ".section-subtitle",
      ".menu-card",
      ".schedule-table",
      ".schedule-note",
      ".map-wrap",
      ".location-info",
      ".contact-card",
      ".social-links",
    ];
    var elements = document.querySelectorAll(selectors.join(","));

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 0.08 + "s";
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  applyTheme();
  applySEO();

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderHero();
    renderServices();
    renderSchedule();
    renderLocation();
    renderContact();
    renderFooter();
    initScrollReveal();
  });
})();
