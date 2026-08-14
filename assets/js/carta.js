/**
 * ============================================================
 *  carta.js — Motor de la página de la carta (carta.html)
 * ============================================================
 * Igual que main.js: todos los datos salen de config.js. Esta
 * página tiene dos "pantallas" dentro de la misma URL base:
 *   - carta.html          → cuadrícula de categorías
 *   - carta.html#<slug>   → detalle de esa categoría
 * El cambio entre pantallas se hace por el hash de la URL, así
 * que el botón "atrás" del navegador/móvil funciona solo.
 * ============================================================
 */
(function () {
  "use strict";

  if (typeof CONFIG === "undefined") {
    console.error("No se ha encontrado CONFIG. Revisa que config.js esté cargado antes que carta.js.");
    return;
  }

  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------
     COLORES (variables CSS) — igual que en main.js
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

  function applyFavicon() {
    var images = CONFIG.images || {};
    if (images.favicon) {
      var favicon = $("favicon-link");
      if (favicon) favicon.setAttribute("href", images.favicon);
    }
  }

  /* ---------------------------------------------------------
     HEADER / LOGO / NAV
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
     FOOTER Y BOTÓN DE WHATSAPP
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

  function renderWhatsAppFloat() {
    var contact = CONFIG.contact || {};
    var floatBtn = $("whatsapp-float");
    if (contact.whatsapp) {
      var msg = encodeURIComponent(contact.whatsappDefaultMessage || "Hola, quería hacer una consulta");
      floatBtn.href = "https://wa.me/" + contact.whatsapp + "?text=" + msg;
    } else {
      floatBtn.hidden = true;
    }
  }

  /* ---------------------------------------------------------
     CUADRÍCULA DE CATEGORÍAS Y DETALLE
  --------------------------------------------------------- */
  var section = CONFIG.servicesSection || {};
  var categories = section.categories || [];

  function categoryBySlug(slug) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].slug === slug) return categories[i];
    }
    return null;
  }

  function renderGrid() {
    $("carta-title").textContent = section.sectionTitle || "Nuestra Carta";
    $("carta-subtitle").textContent = section.sectionSubtitle || "";

    var wrap = $("menu-grid");
    wrap.innerHTML = "";

    categories.forEach(function (cat) {
      var card = document.createElement("a");
      card.className = "menu-card";
      card.href = "#" + (cat.slug || "");

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
  }

  function renderDetail(cat) {
    $("menu-detail-title").textContent = cat.name || "";

    var wrap = $("menu-detail-items");
    wrap.innerHTML = "";

    var items = cat.items || [];
    if (cat.comingSoon || items.length === 0) {
      var empty = document.createElement("div");
      empty.className = "menu-empty";
      empty.innerHTML =
        '<div class="menu-empty-icon" aria-hidden="true">🍽️</div>' +
        "<p>Estamos preparando esta parte de la carta. ¡Vuelve pronto!</p>";
      wrap.appendChild(empty);
      return;
    }

    items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "menu-item-card";

      if (item.image) {
        var thumb = document.createElement("img");
        thumb.className = "menu-item-thumb";
        thumb.src = item.image;
        thumb.alt = item.name || "";
        thumb.loading = "lazy";
        row.appendChild(thumb);
      }

      var main = document.createElement("div");
      main.className = "menu-item-main";
      var name = document.createElement("div");
      name.className = "menu-item-name";
      name.textContent = item.name || "";
      main.appendChild(name);
      if (item.description) {
        var desc = document.createElement("div");
        desc.className = "menu-item-description";
        desc.textContent = item.description;
        main.appendChild(desc);
      }
      row.appendChild(main);

      if (item.price) {
        var price = document.createElement("div");
        price.className = "menu-item-price";
        price.textContent = item.price;
        row.appendChild(price);
      }

      wrap.appendChild(row);
    });
  }

  /* ---------------------------------------------------------
     NAVEGACIÓN ENTRE PANTALLAS (por el hash de la URL)
  --------------------------------------------------------- */
  var gridView = $("menu-grid-view");
  var detailView = $("menu-detail-view");
  var bizName = (CONFIG.business || {}).name || "";

  function route() {
    var slug = decodeURIComponent(location.hash.replace(/^#/, ""));
    var cat = slug ? categoryBySlug(slug) : null;

    if (cat) {
      renderDetail(cat);
      gridView.hidden = true;
      detailView.hidden = false;
      document.title = cat.name + " | Carta" + (bizName ? " | " + bizName : "");
    } else {
      gridView.hidden = false;
      detailView.hidden = true;
      document.title = "Carta" + (bizName ? " | " + bizName : "");
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  window.addEventListener("hashchange", route);

  $("menu-back") &&
    $("menu-back").addEventListener("click", function () {
      history.pushState("", document.title, window.location.pathname + window.location.search);
      route();
    });

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  applyTheme();
  applyFavicon();

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderWhatsAppFloat();
    renderGrid();
    route();
  });
})();
