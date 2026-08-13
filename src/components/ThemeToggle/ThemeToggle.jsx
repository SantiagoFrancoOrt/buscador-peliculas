import { useTheme } from '../../hooks/useTheme.js'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const esOscuro = theme === 'dark'
  const etiqueta = esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'

  return (
    <button
      type="button"
      className={styles.boton}
      onClick={toggleTheme}
      aria-label={etiqueta}
      title={etiqueta}
    >
      <span aria-hidden="true">{esOscuro ? '☀️' : '🌙'}</span>
    </button>
  )
}

export default ThemeToggle
