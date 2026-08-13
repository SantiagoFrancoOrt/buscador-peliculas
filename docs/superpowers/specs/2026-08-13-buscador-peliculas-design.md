# Buscador de Películas — documento de diseño

Fecha: 2026-08-13

## Objetivo

Una SPA en React + Vite que consume la API de TMDB, pensada como proyecto de
portfolio: tiene que abrirse desde un link y entenderse en diez segundos, y su
código tiene que poder explicarse en una entrevista.

## Alcance

Dentro del alcance:

- Home con películas populares y buscador por título (con debounce).
- Página de detalle de una película.
- Favoritos persistidos en el navegador.
- Tema claro/oscuro persistente.
- Estados de carga, error y "sin resultados" en todas las pantallas.
- Diseño responsive y deploy en Vercel.

Fuera del alcance (decidido explícitamente):

- Tests automatizados, paginación / scroll infinito, autenticación, backend
  propio, TypeScript.

## Stack

- React 19 + Vite 8 (JavaScript, sin TypeScript).
- React Router 7 para el ruteo.
- CSS Modules por componente + variables CSS globales para el tema.
- Sin librería de estado: `useState` / `useContext` alcanzan para este tamaño.

La decisión de quedarnos en JavaScript es deliberada: el objetivo es dominar el
código que se muestra, no exhibir el stack más grande posible.

## Rutas

| Ruta         | Pantalla                                                         |
| ------------ | ---------------------------------------------------------------- |
| `/`          | Home: populares por defecto; al escribir, resultados de búsqueda  |
| `/movie/:id` | Detalle: póster, sinopsis, año, géneros, puntaje, botón favorito  |
| `/favoritos` | Grilla con las películas guardadas                                |
| `*`          | 404                                                               |

## Estructura de archivos

```
src/
├─ main.jsx              # router + providers
├─ App.jsx               # layout: Header + Outlet + Footer
├─ api/tmdb.js           # única capa que habla con TMDB
├─ hooks/
│  ├─ useDebounce.js     # retrasa la búsqueda 400 ms
│  ├─ useMovies.js       # data / loading / error del listado
│  ├─ useMovie.js        # ídem para el detalle de una película
│  ├─ useFavorites.js    # acceso al contexto de favoritos
│  └─ useTheme.js        # claro/oscuro + persistencia
├─ context/FavoritesContext.jsx
├─ components/           # Header, SearchBar, MovieGrid, MovieCard,
│                        # Spinner, Message, Footer (cada uno con su .module.css)
├─ pages/                # Home, MovieDetail, Favorites, NotFound
└─ styles/global.css     # reset + variables CSS del tema
```

## Principio de organización

Ningún componente hace `fetch`. Las peticiones viven en `api/tmdb.js`
(`getPopular`, `searchMovies`, `getMovieById`), los hooks manejan los estados y
los componentes solo pintan. Cada capa se puede entender y cambiar sin leer las
otras.

## Flujo de datos

**Home.** El input actualiza `query` → `useDebounce` espera 400 ms → `useMovies`
llama a `searchMovies(query)`, o a `getPopular()` si el input está vacío. La
pantalla resuelve cuatro estados: cargando (spinner), error (mensaje + botón
_Reintentar_), sin resultados (mensaje) y resultados (grilla).

**Detalle.** `useParams()` entrega el `id` → `getMovieById(id)` → mismos estados.
Funciona entrando por URL directa, no solo navegando desde la home.

**Favoritos.** `FavoritesContext` mantiene el listado y lo sincroniza con
`localStorage`. El botón de favorito aparece en cada tarjeta y en el detalle; el
estado sobrevive al refresh.

**Tema.** `useTheme` escribe `data-theme` en el elemento `<html>` y todo el CSS
usa variables (`--bg`, `--text`, `--card`, …). Al arrancar respeta
`prefers-color-scheme` y luego recuerda la elección del usuario.

## Manejo de errores

- `api/tmdb.js` lanza un `Error` con mensaje legible en español cuando la
  respuesta no es `ok` (incluye el caso de API key inválida o faltante).
- Los hooks capturan el error y lo exponen; la UI lo muestra con el componente
  `Message` y un botón para reintentar.
- Cada petición usa `AbortController`: al escribir rápido se cancelan las
  búsquedas viejas, así una respuesta lenta no pisa a la más reciente.

## API key

Vive en `.env` (ignorado por git) como `VITE_TMDB_API_KEY`, con un
`.env.example` versionado. En una app frontend la clave queda igual dentro del
bundle: la forma correcta de resolverlo sería un backend propio o una serverless
function que actúe de proxy. Queda documentado como limitación conocida.

TMDB exige atribución: el footer incluye el aviso de que el producto usa la API
de TMDB sin estar avalado por ellos.

## Verificación antes de dar por cerrado

Checklist manual, sin tests automatizados:

1. Búsqueda con resultados y búsqueda sin resultados.
2. Red caída (DevTools → Offline): muestra error y el botón reintentar funciona.
3. Refresh directo en `/movie/:id`.
4. Favoritos y tema persisten después de recargar.
5. Se ve bien a 360 px de ancho.
6. `npm run build` termina sin warnings.

## Entregables

Repositorio en GitHub con README (capturas, stack, instrucciones, link al
deploy), app publicada en Vercel y una línea lista para el CV.
