/**
 * Unica capa de la app que habla con TMDB.
 *
 * Los componentes no hacen fetch: piden datos a estas funciones, que ya
 * devuelven objetos con la forma que necesita la interfaz. Si TMDB cambiara el
 * nombre de un campo, se toca solamente este archivo.
 */

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const LANGUAGE = 'es-ES'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

/** Arma la URL de una imagen. Devuelve null si la pelicula no tiene poster. */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

/**
 * Hace la peticion y traduce cualquier problema a un mensaje que se pueda
 * mostrar en pantalla. El AbortError se deja pasar tal cual: no es un error
 * real, es una busqueda que quedo vieja y cancelamos a proposito.
 */
async function request(endpoint, { params = {}, signal } = {}) {
  if (!API_KEY) {
    throw new Error(
      'Falta la API key de TMDB. Copia el archivo .env.example como .env y pega tu clave en VITE_TMDB_API_KEY.',
    )
  }

  const url = new URL(BASE_URL + endpoint)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', LANGUAGE)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  let response
  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('No pudimos conectarnos con TMDB. Revisa tu conexion a internet.')
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('La API key de TMDB no es valida. Revisa el valor de VITE_TMDB_API_KEY en tu archivo .env.')
    }
    if (response.status === 404) {
      throw new Error('No encontramos esa pelicula en TMDB.')
    }
    throw new Error(`TMDB respondio con un error (${response.status}). Volve a intentar en un rato.`)
  }

  return response.json()
}

/** Datos minimos que necesita una tarjeta de la grilla. */
function toMovie(raw) {
  return {
    id: raw.id,
    title: raw.title,
    posterUrl: getImageUrl(raw.poster_path, 'w342'),
    year: raw.release_date ? raw.release_date.slice(0, 4) : null,
    rating: raw.vote_average ? Math.round(raw.vote_average * 10) / 10 : null,
  }
}

/** Datos completos para la pagina de detalle. */
function toMovieDetail(raw) {
  return {
    ...toMovie(raw),
    posterUrl: getImageUrl(raw.poster_path, 'w500'),
    backdropUrl: getImageUrl(raw.backdrop_path, 'w1280'),
    overview: raw.overview || '',
    tagline: raw.tagline || '',
    runtime: raw.runtime || null,
    genres: (raw.genres ?? []).map((genre) => genre.name),
  }
}

/** Peliculas populares del momento: es lo que se ve al entrar, sin buscar nada. */
export async function getPopular({ signal } = {}) {
  const data = await request('/movie/popular', { signal })
  return data.results.map(toMovie)
}

/** Busqueda por titulo. */
export async function searchMovies(query, { signal } = {}) {
  const data = await request('/search/movie', {
    params: { query, include_adult: 'false' },
    signal,
  })
  return data.results.map(toMovie)
}

/** Detalle de una pelicula puntual. */
export async function getMovieById(id, { signal } = {}) {
  const data = await request(`/movie/${id}`, { signal })
  return toMovieDetail(data)
}
