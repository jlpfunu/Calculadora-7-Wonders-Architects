# Marcador — 7 Wonders: Architects

App web para calcular la puntuación final de una partida de *7 Wonders: Architects*.

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
