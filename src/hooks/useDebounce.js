import { useEffect, useState } from 'react'

/**
 * Devuelve el valor recien despues de que pasaron `delay` milisegundos sin que
 * cambie. Sirve para no disparar una peticion por cada tecla que se aprieta:
 * mientras el usuario escribe, el temporizador se reinicia una y otra vez.
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const temporizador = setTimeout(() => setDebouncedValue(value), delay)

    // Si el valor cambia antes de tiempo, se cancela el anterior
    return () => clearTimeout(temporizador)
  }, [value, delay])

  return debouncedValue
}
