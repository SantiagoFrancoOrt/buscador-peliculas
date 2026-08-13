import styles from './Spinner.module.css'

/** Indicador de carga. El texto queda para lectores de pantalla. */
function Spinner({ label = 'Cargando...' }) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.spinner} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default Spinner
