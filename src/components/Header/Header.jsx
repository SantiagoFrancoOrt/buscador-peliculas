import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span aria-hidden="true">🎬</span>
          <span>
            Buscador de <strong>Peliculas</strong>
          </span>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
