import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

/** Tarjeta de la grilla: poster, titulo, ano y puntaje. Lleva al detalle. */
function MovieCard({ movie }) {
  return (
    <li className={styles.card}>
      <Link to={`/movie/${movie.id}`} className={styles.link}>
        <div className={styles.posterBox}>
          {movie.posterUrl ? (
            <img
              className={styles.poster}
              src={movie.posterUrl}
              alt={`Poster de ${movie.title}`}
              loading="lazy"
            />
          ) : (
            <div className={styles.sinPoster}>
              <span aria-hidden="true">🎞️</span>
              <span>Sin poster</span>
            </div>
          )}

          {movie.rating > 0 && (
            <span className={styles.rating}>
              <span aria-hidden="true">★</span> {movie.rating}
            </span>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title}</h3>
          {movie.year && <p className={styles.year}>{movie.year}</p>}
        </div>
      </Link>
    </li>
  )
}

export default MovieCard
