import styles from './Message.module.css'

/**
 * Mensaje centrado para los estados que no son "hay resultados": un error, una
 * busqueda sin coincidencias o una lista vacia. Si recibe onRetry muestra el
 * boton para volver a intentar.
 */
function Message({ icon = 'ℹ️', title, children, onRetry }) {
  return (
    <div className={styles.message}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default Message
