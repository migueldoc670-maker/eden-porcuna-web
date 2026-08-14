/**
 * ============================================================
 *  CONFIG.JS — ÚNICO ARCHIVO A EDITAR PARA CADA CLIENTE
 * ============================================================
 * Cambia aquí nombre, colores, textos, horario, servicios,
 * ubicación y contacto. No toques index.html ni los .css/.js
 * salvo que quieras cambiar el diseño base de la plantilla.
 *
 * Guía rápida de campos obligatorios vs opcionales:
 * - Deja "" (cadena vacía) o [] en lo que el negocio no tenga
 *   (ej. sin Instagram, sin fotos) y la plantilla lo oculta solo.
 * ============================================================
 */

const CONFIG = {

  // ------------------------------------------------------------
  // 1. NEGOCIO — datos básicos
  // ------------------------------------------------------------
  business: {
    name: "Edén Porcuna",
    // Tipo de negocio: usado en el SEO y en datos estructurados (schema.org)
    // Ejemplos válidos: "CafeOrCoffeeShop", "Restaurant", "BarOrPub",
    // "HairSalon", "Store", "AutoRepair", "LocalBusiness"
    schemaType: "CafeOrCoffeeShop",
    tagline: "Desayunos, meriendas y copas en Porcuna",
    town: "Porcuna",
    province: "Jaén",
  },

  // ------------------------------------------------------------
  // 2. SEO — título, descripción y palabras clave
  // ------------------------------------------------------------
  seo: {
    // Aparece en la pestaña del navegador y en Google (55-60 caracteres ideal)
    title: "Edén Porcuna | Desayunos, Meriendas y Copas en Jaén",
    // Meta description (140-160 caracteres ideal)
    description:
      "Edén Porcuna (Jaén): desayunos, meriendas y copas en buen ambiente. Consulta horario y cómo llegar. ¡Te esperamos!",
    keywords:
      "Eden Porcuna, cafeteria Porcuna, desayunos Porcuna, meriendas Porcuna, copas Porcuna, bar en Porcuna Jaén",
    // URL final donde estará publicada la web (para etiquetas canonical/OG)
    // TODO: si el negocio compra un dominio propio (ej. edenporcuna.es),
    // actualizar aquí y configurarlo en GitHub Pages
    siteUrl: "https://migueldoc670-maker.github.io/eden-porcuna-web",
    // Imagen para compartir en redes sociales (WhatsApp, Facebook...) 1200x630 recomendado
    ogImage: "assets/img/og-image.jpg",
  },

  // ------------------------------------------------------------
  // 3. COLORES Y TIPOGRAFÍA — cambia el aspecto de toda la web
  // ------------------------------------------------------------
  theme: {
    // Paleta tomada del logo real (hojas verdes y azules, texto verde oscuro)
    primaryColor: "#2f6b46",     // verde del logo (botones, acentos, header)
    primaryDark: "#1e4a2f",      // verde más oscuro (hover)
    secondaryColor: "#5aa9c9",   // azul del logo (detalles, iconos, hover de texto)
    darkColor: "#1e3d2b",        // verde muy oscuro, sustituye al negro en textos/footer
    lightColor: "#faf9f5",       // blanco roto, como el fondo del logo
    whatsappColor: "#25d366",    // normalmente no hace falta tocarlo
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",       // texto general
    headingFontFamily: "Georgia, 'Times New Roman', serif", // títulos, look más elegante
  },

  // ------------------------------------------------------------
  // 4. LOGO E IMÁGENES
  // ------------------------------------------------------------
  images: {
    logo: "assets/img/logo.jpg",   // logo real de Edén Carrera Café
    // TODO: el favicon sigue siendo un placeholder — recortar un icono
    // cuadrado simple a partir del logo real cuando se pueda
    favicon: "assets/img/favicon.svg",
    heroImage: "assets/img/hero.jpg", // foto real del local (interior/heladería)
    heroOverlayOpacity: 0.55,             // 0 a 1, oscurece la foto para que se lea el texto
    gallery: [
      // Añade tantas fotos como quieras, o deja el array vacío []
      // "assets/img/foto1.jpg",
      // "assets/img/foto2.jpg",
    ],
  },

  // ------------------------------------------------------------
  // 5. INICIO (HERO)
  // ------------------------------------------------------------
  hero: {
    title: "Edén Porcuna",
    subtitle: "Desayunos, meriendas y copas en el centro de Porcuna",
    ctaText: "Ver Carta",
    ctaLink: "carta.html",
    ctaSecondaryText: "Cómo llegar",
    ctaSecondaryLink: "#ubicacion",
  },

  // ------------------------------------------------------------
  // 6. SERVICIOS / MENÚ
  // ------------------------------------------------------------
  // La carta vive en su propia página (carta.html): pulsar "Carta" en el
  // menú, en el botón del inicio o en cualquier tarjeta de categoría lleva
  // directamente allí. Cada categoría es "una página" dentro de esa carta
  // (carta.html#slug) con su propia lista de platos/bebidas.
  servicesSection: {
    sectionTitle: "Nuestra Carta",
    sectionSubtitle: "Desayunos, meriendas y copas en Porcuna",
    viewAllText: "Ver carta completa",
    // TODO: sustituir por los platos/bebidas y precios reales de Edén Porcuna.
    // Mientras una categoría tenga comingSoon: true, esa página de la carta
    // muestra un aviso de "carta en preparación" en vez de platos inventados.
    // Cuando tengas los datos reales: rellena "items" y pon comingSoon: false.
    categories: [
      {
        slug: "desayunos",
        name: "Desayunos",
        image: "assets/img/menu-desayunos.svg", // TODO: sustituir por foto real
        comingSoon: true,
        items: [
          // { name: "Tostada con AOVE", description: "Pan de pueblo, tomate y aceite", price: "2,50 €" },
        ],
      },
      {
        slug: "meriendas",
        name: "Meriendas",
        image: "assets/img/menu-meriendas.svg", // TODO: sustituir por foto real
        comingSoon: true,
        items: [
          // { name: "Tarta de queso", description: "Con coulis de frutos rojos", price: "3,80 €" },
        ],
      },
      {
        slug: "copas",
        name: "Copas",
        image: "assets/img/menu-copas.svg", // TODO: sustituir por foto real
        comingSoon: true,
        items: [
          // { name: "Gin Tonic", description: "A elegir ginebra", price: "6,00 €" },
        ],
      },
    ],
  },

  // ------------------------------------------------------------
  // 7. HORARIO
  // ------------------------------------------------------------
  schedule: {
    sectionTitle: "Horario",
    note: "El horario puede variar en días festivos (ej. Asunción de la Virgen)",
    days: [
      { label: "Lunes", hours: "6:30 - 20:00" },
      { label: "Martes", hours: "6:30 - 20:00" },
      { label: "Miércoles", hours: "6:30 - 20:00" },
      { label: "Jueves", hours: "6:30 - 20:00" },
      { label: "Viernes", hours: "6:30 - 2:00" },
      { label: "Sábado", hours: "6:30 - 2:00" },
      { label: "Domingo", hours: "Cerrado" },
    ],
  },

  // ------------------------------------------------------------
  // 8. UBICACIÓN
  // ------------------------------------------------------------
  location: {
    sectionTitle: "Dónde Estamos",
    address: "Calle General Aguilera, 2, 23790 Porcuna, Jaén",
    // URL de "insertar mapa" de Google Maps (Compartir > Insertar un mapa > copiar el src del iframe)
    // TODO: ideal sustituir por el src exacto desde Google Maps > Compartir > Insertar un mapa
    mapEmbedUrl:
      "https://www.google.com/maps?q=Calle+General+Aguilera+2+Porcuna+Ja%C3%A9n&output=embed",
    // Enlace normal de Google Maps para el botón "Cómo llegar" (abre la app)
    mapLinkUrl: "https://maps.google.com/?q=Calle+General+Aguilera+2+Porcuna+Jaen",
  },

  // ------------------------------------------------------------
  // 9. CONTACTO Y REDES SOCIALES
  // ------------------------------------------------------------
  contact: {
    phone: "644 82 67 61",          // se muestra tal cual
    phoneLink: "+34644826761",      // formato internacional para el enlace tel:
    whatsapp: "34644826761",        // número con prefijo de país SIN + ni espacios
    whatsappDefaultMessage: "Hola, me gustaría hacer una consulta 😊",
    email: "", // deja "" si no tiene email público

    // Deja "" en cualquier red que el negocio no tenga y desaparece sola
    social: {
      instagram: "https://instagram.com/eden.porcuna",
      facebook: "https://www.facebook.com/Eden.carrera.porcuna/",
      tiktok: "",
      x: "",
    },
  },

  // ------------------------------------------------------------
  // 10. PIE DE PÁGINA
  // ------------------------------------------------------------
  footer: {
    text: "Edén Porcuna — Porcuna, Jaén",
    showCredit: true, // muestra "Web creada por..." — pon false para ocultarlo
    creditText: "Web creada por Clout",
    // TODO: poner aquí la URL de Clout si tiene web, para que el texto enlace
    creditLink: "",
  },
};
