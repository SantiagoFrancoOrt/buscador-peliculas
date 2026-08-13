import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid/MovieGrid.jsx'
import Message from '../components/Message/Message.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import styles from './Favorites.module.css'

/**
 * No pide nada a TMDB: las peliculas guardadas ya viven en el navegador, asi
 * que esta pagina no tiene estados de carga ni de error.
 */
function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="container">
      <h1 className={styles.titulo}>
        Mis favoritos {favorites.length > 0 && <span>({favorites.length})</span>}
      </h1>

      {favorites.length === 0 ? (
        <Message icon="♡" title="Todavia no guardaste ninguna pelicula">
          Marca el corazon de cualquier pelicula y va a aparecer aca.{' '}
          <Link to="/">Ir a explorar</Link>
        </Message>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}

export default Favorites
