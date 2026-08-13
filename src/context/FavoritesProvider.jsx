import { useEffect, useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'

const STORAGE_KEY = 'buscador-peliculas:favoritos'

/**
 * Lee lo guardado en el navegador. Si el dato esta roto o el storage no esta
 * disponible (modo incognito, permisos), arrancamos con la lista vacia en vez
 * de romper toda la app.
 */
function leerFavoritosGuardados() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

/**
 * Guarda los favoritos y los mantiene sincronizados con localStorage.
 *
 * Se almacena la pelicula entera (no solo el id) para que la pagina de
 * favoritos pueda dibujarse al instante, sin volver a pedirle nada a TMDB.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(leerFavoritosGuardados)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Si el navegador no deja escribir, los favoritos duran lo que la sesion
    }
  }, [favorites])

  const isFavorite = (id) => favorites.some((favorita) => favorita.id === id)

  const toggleFavorite = (movie) => {
    setFavorites((actuales) => {
      if (actuales.some((favorita) => favorita.id === movie.id)) {
        return actuales.filter((favorita) => favorita.id !== movie.id)
      }

      // Guardamos solo los campos que necesita una tarjeta
      return [
        ...actuales,
        {
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          year: movie.year,
          rating: movie.rating,
        },
      ]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
