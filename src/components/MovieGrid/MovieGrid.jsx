import MovieCard from '../MovieCard/MovieCard.jsx'
import styles from './MovieGrid.module.css'

/** Grilla responsive de tarjetas. Solo se ocupa de acomodarlas. */
function MovieGrid({ movies }) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

export default MovieGrid
