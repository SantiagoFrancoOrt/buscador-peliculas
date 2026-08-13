# 🎬 Buscador de Películas

Aplicación web para buscar películas, ver su ficha completa y guardar favoritas.
Hecha con **React + Vite**, consumiendo la API de [TMDB](https://www.themoviedb.org/).

🔗 **Demo:** _(pegar acá la URL de Vercel una vez publicado)_

<!-- Sugerencia: agregar dos capturas (tema claro y tema oscuro) en docs/capturas/ -->

## Qué hace

- **Buscador con debounce:** espera 400 ms a que dejes de escribir antes de
  consultar la API, en vez de disparar una petición por cada tecla.
- **Películas populares** al entrar, sin necesidad de buscar nada.
- **Ficha de detalle** con póster, sinopsis, año, duración, géneros y puntaje.
  Funciona también entrando por URL directa.
- **Favoritos** guardados en el navegador: sobreviven al refresh.
- **Tema claro/oscuro** que respeta la preferencia del sistema y recuerda la
  elección del usuario.
- **Estados bien resueltos** en cada pantalla: cargando, error con botón para
  reintentar, y búsqueda sin resultados.
- **Responsive**, de 360 px hasta escritorio.

## Stack

| Herramienta      | Para qué                                            |
| ---------------- | --------------------------------------------------- |
| React 19         | Interfaz por componentes, hooks y Context           |
| Vite 8           | Servidor de desarrollo y build de producción        |
| React Router 7   | Ruteo entre páginas                                 |
| CSS Modules      | Estilos con alcance local por componente            |
| API de TMDB      | Datos de las películas                              |

Sin librerías de estado ni de UI: para una app de este tamaño, `useState` y
`useContext` alcanzan y sobran.

## Cómo correrlo

Necesitás Node 18 o superior.

```bash
# 1. Clonar el repositorio
git clone https://github.com/SantiagoFrancoOrt/buscador-peliculas.git
cd buscador-peliculas

# 2. Instalar las dependencias
npm install

# 3. Configurar la API key
cp .env.example .env      # en Windows: copy .env.example .env
# abrir .env y pegar tu clave en VITE_TMDB_API_KEY

# 4. Levantar el proyecto
npm run dev
```

La API key se saca gratis (para uso no comercial) en
[themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

Otros comandos disponibles:

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build para revisarlo localmente
npm run lint      # revisa el código con Oxlint
```

## Estructura del proyecto

```
src/
├─ api/tmdb.js       # única capa que habla con TMDB
├─ hooks/            # useDebounce, useMovies, useMovie, useFavorites, useTheme
├─ context/          # estado global de favoritos
├─ components/       # piezas reutilizables, cada una con su CSS Module
├─ pages/            # Home, MovieDetail, Favorites, NotFound
└─ styles/           # reset y variables CSS del tema
```

La regla que ordena todo: **ningún componente hace `fetch`**. Las peticiones
viven en `api/tmdb.js`, los hooks manejan los estados y los componentes solo
pintan. Si TMDB cambiara el nombre de un campo, se toca un solo archivo.

## Decisiones técnicas

- **Debounce en la búsqueda.** Evita una avalancha de peticiones mientras se
  escribe.
- **`AbortController` en cada petición.** Si el usuario sigue escribiendo, la
  búsqueda anterior se cancela: así una respuesta lenta no puede pisar a la más
  reciente, que es el bug clásico de los buscadores.
- **Traducción de la respuesta de la API.** `api/tmdb.js` convierte el JSON de
  TMDB a objetos con la forma que necesita la interfaz, para que los
  componentes no dependan de los nombres de campo de un servicio externo.
- **Favoritos guardados completos, no por id.** La página de favoritos se
  dibuja al instante, sin pedirle nada a TMDB.
- **Colores por variables CSS.** Cambiar de tema es cambiar un atributo del
  `<html>`; ningún componente escribe un color a mano.
- **Sobre la API key:** en una app 100 % frontend la clave termina dentro del
  bundle y es visible. Para un proyecto personal es lo habitual; la solución
  real sería un backend propio o una serverless function que haga de proxy y
  guarde la clave del lado del servidor. Queda documentado como limitación
  conocida.

## Limitaciones conocidas

- Sin tests automatizados: la verificación es manual (búsqueda con y sin
  resultados, red caída, refresh en el detalle, persistencia de favoritos y
  tema, y vista a 360 px).
- Sin paginación: se muestra la primera página de resultados de TMDB.
- La API key queda expuesta en el cliente, como se explica arriba.

## Publicar en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel, importar el repo (detecta Vite solo).
3. Agregar la variable de entorno `VITE_TMDB_API_KEY` con la clave.
4. Deploy.

El archivo `vercel.json` incluye la regla de reescritura que necesita cualquier
SPA para que las URLs internas, como `/movie/550`, no den 404 al recargar.

---

Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
