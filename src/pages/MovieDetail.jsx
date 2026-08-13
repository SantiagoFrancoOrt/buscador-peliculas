import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner.jsx'
import Message from '../components/Message/Message.jsx'
import { useMovie } from '../hooks/useMovie.js'
import styles from './MovieDetail.module.css'

/** Pasa los minutos de TMDB a algo legible: 135 -> "2 h 15 min". */
function formatearDuracion(minutos) {
  if (!minutos) return null
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return horas > 0 ? `${horas} h ${resto} min` : `${resto} min`
}

function MovieDetail() {
  const { id } = useParams()
  const { movie, loading, error, reintentar } = useMovie(id)

  if (loading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <Message icon="⚠️" title="No pudimos cargar la pelicula" onRetry={reintentar}>
          {error}
        </Message>
      </div>
    )
  }

  // Red de seguridad: sin datos y sin error no hay nada que dibujar
  if (!movie) return null

  const duracion = formatearDuracion(movie.runtime)

  return (
    <article>
      {movie.backdropUrl && (
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          aria-hidden="true"
        />
      )}

      <div className={`container ${styles.contenido}`}>
        <Link to="/" className={styles.volver}>
          ← Volver
        </Link>

        <div className={styles.ficha}>
          {movie.posterUrl ? (
            <img
              className={styles.poster}
              src={movie.posterUrl}
              alt={`Poster de ${movie.title}`}
            />
          ) : (
            <div className={styles.sinPoster} aria-hidden="true">
              🎞️
            </div>
          )}

          <div className={styles.datos}>
            <h1 className={styles.titulo}>{movie.title}</h1>
            {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

            <ul className={styles.meta}>
              {movie.year && <li>{movie.year}</li>}
              {duracion && <li>{duracion}</li>}
              {movie.rating > 0 && (
                <li className={styles.rating}>
                  <span aria-hidden="true">★</span> {movie.rating}
                </li>
              )}
            </ul>

            {movie.genres.length > 0 && (
              <ul className={styles.generos}>
                {movie.genres.map((genero) => (
                  <li key={genero} className={styles.genero}>
                    {genero}
                  </li>
                ))}
              </ul>
            )}

            <h2 className={styles.subtitulo}>Sinopsis</h2>
            <p className={styles.sinopsis}>
              {movie.overview || 'Esta pelicula todavia no tiene sinopsis cargada en TMDB.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MovieDetail
