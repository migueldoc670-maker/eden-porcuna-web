# Plantilla Web — Negocios Locales de Porcuna

Plantilla reutilizable en **HTML + CSS + JS vanilla** (sin frameworks) para
bares, tiendas, talleres, peluquerías y demás negocios locales. Pensada para
personalizar en minutos y alojar gratis en GitHub Pages o en cualquier
hosting compartido barato.

## 📁 Estructura

```
plantilla-negocios-porcuna/
├── index.html              ← estructura de la web (normalmente no se toca)
├── config.js                ← ⭐ ÚNICO archivo a editar por cliente
├── README.md
└── assets/
    ├── css/
    │   └── styles.css       ← diseño (normalmente no se toca)
    ├── js/
    │   └── main.js           ← motor que vuelca config.js en el HTML
    ├── img/
    │   ├── logo-placeholder.svg
    │   ├── hero-placeholder.svg
    │   └── favicon.svg
    └── icons/                ← (libre para iconos extra si hicieran falta)
```

## 🚀 Cómo personalizar para un cliente nuevo

1. Copia la carpeta entera `plantilla-negocios-porcuna` con el nombre del
   nuevo cliente (ej. `bar-manolo-porcuna`).
2. Abre **`config.js`** y cambia únicamente los datos: nombre del negocio,
   colores, textos, teléfono, WhatsApp, horario, servicios/menú, ubicación
   y redes sociales. El archivo está comentado por secciones numeradas.
3. Sustituye las imágenes de `assets/img/` por las fotos reales del
   negocio (logo, foto de portada) y actualiza las rutas correspondientes
   en `config.js` (sección 4 — IMÁGENES).
4. Abre `index.html` en el navegador (doble clic) para comprobar que todo
   se ve bien. No hace falta servidor ni build: es HTML estático puro.

No debería ser necesario tocar `index.html`, `styles.css` ni `main.js`
salvo que quieras cambiar el diseño base de la plantilla para todos los
clientes a la vez.

## 🎨 Colores

Los colores se definen en `config.js → theme` y se aplican automáticamente
como variables CSS (`--primary`, `--secondary`, etc.) en tiempo de carga.
Cambia los códigos hexadecimales ahí y toda la web se actualiza sola.

## 🗺️ Mapa de Google Maps

1. Ve a [Google Maps](https://maps.google.com), busca la dirección del
   negocio.
2. Pulsa **Compartir → Insertar un mapa** y copia la URL que aparece
   dentro de `src="..."`.
3. Pégala en `config.js → location.mapEmbedUrl`.
4. En `location.mapLinkUrl` pon el enlace normal de Google Maps (el que
   se usa para "Cómo llegar" y abre la app del móvil).

## 💬 Botón de WhatsApp

En `config.js → contact.whatsapp` pon el número completo con prefijo de
país y sin espacios ni símbolos, por ejemplo `34600000000` para un móvil
español. El botón flotante y la tarjeta de contacto lo usan
automáticamente vía `https://wa.me/`.

## 🔍 SEO local básico

Cada web personaliza automáticamente, a partir de `config.js → seo`:

- `<title>` de la pestaña del navegador
- Meta description
- Meta keywords
- Etiquetas Open Graph (para que se vea bien al compartir en WhatsApp/redes)
- Datos estructurados `schema.org/LocalBusiness` (ayuda a Google a mostrar
  ficha enriquecida: teléfono, dirección, tipo de negocio)
- Hay un único `<h1>` (el nombre del negocio en el hero) y `<h2>` para cada
  sección, como recomienda buenas prácticas de SEO.

Recomendaciones para cada cliente:

- Escribe el `title` con el patrón `[Negocio] Porcuna | [Tipo de negocio]`.
- Menciona "Porcuna" y "Jaén" de forma natural en la `description`.
- Cuando publiques la web, actualiza `seo.siteUrl` con la URL final: hace
  falta para que la etiqueta canonical y Open Graph sean correctas.

## 📦 Publicar en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub y sube el contenido de la carpeta
   del cliente (todo lo que hay dentro de `plantilla-negocios-porcuna/`,
   no la carpeta en sí).
2. Ve a **Settings → Pages** del repositorio.
3. En "Source" selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. En 1-2 minutos la web estará disponible en
   `https://tu-usuario.github.io/nombre-repo/`.
5. (Opcional) Si el cliente tiene dominio propio, configúralo en la misma
   pantalla de Pages con un registro CNAME.

## 📦 Publicar en hosting compartido barato

Simplemente sube por FTP/SFTP (o el gestor de archivos del hosting) todo
el contenido de la carpeta a `public_html/` (o la carpeta raíz del
dominio). Al ser HTML/CSS/JS puro no necesita PHP, base de datos ni
ningún paso de instalación.

## ✅ Checklist antes de entregar al cliente

- [ ] Nombre, teléfono, WhatsApp y dirección correctos en `config.js`
- [ ] Colores ajustados a la imagen de marca del negocio
- [ ] Fotos reales sustituyendo a los placeholders de `assets/img/`
- [ ] Horario actualizado
- [ ] Menú/servicios y precios actualizados
- [ ] Mapa de Google Maps apuntando a la dirección correcta
- [ ] Redes sociales solo las que el negocio realmente tiene (las vacías
      se ocultan solas)
- [ ] `seo.title` y `seo.description` mencionan el negocio + "Porcuna"
- [ ] `seo.siteUrl` actualizado con la URL final una vez publicada
- [ ] Probado en móvil (la mayoría del tráfico vendrá de ahí)
