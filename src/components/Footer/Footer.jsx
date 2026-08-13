import styles from './Footer.module.css'

// TODO: reemplazar por la URL real del repositorio antes de publicar
const REPO_URL = 'https://github.com/tu-usuario/buscador-peliculas'

/**
 * TMDB pide que se aclare que la app usa su API sin estar avalada por ellos.
 * Es una condicion de uso de la API, no un adorno.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          Proyecto personal hecho con React + Vite.{' '}
          <a
            className={styles.link}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ver codigo
          </a>
        </p>
        <p className={styles.credit}>
          Este producto usa la API de{' '}
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>{' '}
          pero no esta avalado ni certificado por TMDB.
        </p>
      </div>
    </footer>
  )
}

export default Footer
