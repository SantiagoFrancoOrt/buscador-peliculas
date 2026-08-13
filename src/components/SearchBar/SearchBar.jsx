import styles from './SearchBar.module.css'

/**
 * Input controlado: no guarda estado propio, se lo deja a la pagina, que es
 * quien decide que hacer con lo que se escribe.
 */
function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar una pelicula por titulo..."
        aria-label="Buscar una pelicula por titulo"
      />
    </div>
  )
}

export default SearchBar
