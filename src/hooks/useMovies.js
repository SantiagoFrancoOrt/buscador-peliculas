import { useEffect, useState } from 'react'
import { getPopular, searchMovies } from '../api/tmdb.js'

/**
 * Trae el listado de peliculas: las populares si no hay busqueda, o los
 * resultados del titulo buscado. Concentra los tres estados de cualquier
 * peticion (cargando, error, datos) para que la pagina solo tenga que pintar.
 *
 * Cada peticion usa un AbortController: si el usuario sigue escribiendo, la
 * busqueda anterior se cancela y una respuesta lenta no puede pisar a la nueva.
 */
export function useMovies(query) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const opciones = { signal: controller.signal }

    setLoading(true)
    setError(null)

    const peticion = query ? searchMovies(query, opciones) : getPopular(opciones)

    peticion
      .then((resultado) => setMovies(resultado))
      .catch((err) => {
        // Cancelamos nosotros: no es un error que haya que mostrar
        if (err.name === 'AbortError') return
        setError(err.message)
        setMovies([])
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [query, intento])

  /** Vuelve a lanzar la misma peticion; lo usa el boton "Reintentar". */
  const reintentar = () => setIntento((valor) => valor + 1)

  return { movies, loading, error, reintentar }
}
