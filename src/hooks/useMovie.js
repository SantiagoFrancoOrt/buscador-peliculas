import { useEffect, useState } from 'react'
import { getMovieById } from '../api/tmdb.js'

/**
 * Trae el detalle de una pelicula. Es el hermano de useMovies para una sola
 * pelicula en lugar de un listado, con los mismos tres estados.
 */
export function useMovie(id) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    getMovieById(id, { signal: controller.signal })
      .then((resultado) => setMovie(resultado))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setMovie(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [id, intento])

  const reintentar = () => setIntento((valor) => valor + 1)

  return { movie, loading, error, reintentar }
}
