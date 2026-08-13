# Marcador — 7 Wonders: Architects

App web con una landing explicando el juego (con el vídeo oficial de reglas
de Repos Production) y un marcador para calcular la puntuación final de una
partida de *7 Wonders: Architects*.

## Configurar tus enlaces de afiliado

Todo se edita en un único archivo: `src/affiliateConfig.js`.

- **Amazon**: date de alta en [afiliados.amazon.es](https://afiliados.amazon.es)
  (Programa de Afiliados de Amazon). Al aprobarte te darán un "tag" (ID de
  seguimiento), tipo `tublog-21`. Sustituye `AMAZON_TAG` en el archivo por
  el tuyo — el resto del enlace ya está preparado.
- **Otras tiendas** (opcional): el archivo incluye espacio para añadir más
  botones de compra, por ejemplo:
  - [Zacatrus](https://www.zacatrus.es) — tienda española especializada en
    juegos de mesa, con programa de afiliados propio.
  - [Philibert](https://www.philibertnet.com) — gran tienda europea con
    programa de afiliados.
  - Cualquier otra tienda con la que llegues a un acuerdo — solo tienes que
    añadir su nombre y enlace en el array `OTHER_STORES`.
  - Mientras el campo `url` esté vacío, ese botón no se muestra en la
    landing, así que puedes ir añadiéndolos poco a poco.

⚠️ Importante: Amazon exige mostrar el aviso de afiliado en la página donde
esté el enlace (ya incluido en la landing) y prohíbe insertar enlaces de
afiliado en emails, PDFs o anuncios de pago — revisa las condiciones del
programa antes de promocionarlo fuera de la web.

## Probarla en local

Necesitas [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Abre la URL que aparezca en la terminal (normalmente `http://localhost:5173`).

## Desplegarla online gratis

### Opción 1: Vercel (recomendada)

1. Crea una cuenta gratis en [vercel.com](https://vercel.com) (puedes entrar con tu cuenta de GitHub).
2. Sube este proyecto a un repositorio de GitHub (ver más abajo).
3. En Vercel, pulsa **Add New → Project**, selecciona el repositorio y pulsa **Deploy**.
4. Vercel detecta automáticamente que es un proyecto Vite — no hace falta configurar nada.
5. En unos segundos tendrás tu app en una URL tipo `https://marcador-7wonders.vercel.app`.

### Opción 2: Netlify

1. Crea una cuenta gratis en [netlify.com](https://netlify.com).
2. Sube el proyecto a GitHub.
3. Pulsa **Add new site → Import an existing project**, elige el repositorio.
4. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Despliega y obtendrás una URL tipo `https://marcador-7wonders.netlify.app`.

### Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Primer commit"
```

Luego crea un repositorio nuevo (vacío) en [github.com/new](https://github.com/new) y ejecuta los comandos que GitHub te muestre, algo como:

```bash
git remote add origin https://github.com/TU_USUARIO/marcador-7wonders.git
git branch -M main
git push -u origin main
```

Después de eso ya puedes conectar el repositorio con Vercel o Netlify como se explica arriba.

## Dominio propio (opcional)

Tanto Vercel como Netlify permiten añadir un dominio propio (por ejemplo `marcador7wonders.com`) gratis en la parte de hosting — solo pagarías el registro del dominio en sí, normalmente unos 10€/año en un registrador como Namecheap o Google Domains.
