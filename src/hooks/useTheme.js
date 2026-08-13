import { useEffect, useState } from 'react'

// Si cambias esta clave, actualiza tambien el script del index.html
const STORAGE_KEY = 'buscador-peliculas:tema'

/**
 * Decide el tema inicial: primero lo que el usuario haya elegido antes y,
 * si es la primera visita, lo que tenga configurado en su sistema operativo.
 */
function temaInicial() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado === 'light' || guardado === 'dark') return guardado
  } catch {
    // Sin storage disponible seguimos con la preferencia del sistema
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Maneja el tema de la app. Escribe data-theme en el <html> y el CSS hace el
 * resto: como todos los colores salen de variables, no hay que tocar ningun
 * componente.
 *
 * Lo usa un solo componente (el boton de la cabecera). Si en el futuro hiciera
 * falta leer el tema desde varios lugares, habria que moverlo a un Context como
 * el de favoritos, porque cada llamada al hook crea su propio estado.
 */
export function useTheme() {
  const [theme, setTheme] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Si el navegador no deja escribir, el tema dura lo que la sesion
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((actual) => (actual === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
