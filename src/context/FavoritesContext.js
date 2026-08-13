import { createContext } from 'react'

/**
 * El contexto vive en su propio archivo: si estuviera junto al provider, cada
 * cambio en el componente romperia el fast refresh de Vite en desarrollo.
 */
export const FavoritesContext = createContext(null)
