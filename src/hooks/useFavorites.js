import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext.js'

/**
 * Acceso a los favoritos desde cualquier componente. El error explicito evita
 * el clasico "no entiendo por que es undefined" cuando falta el Provider.
 */
export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites tiene que usarse dentro de <FavoritesProvider>')
  }

  return context
}
