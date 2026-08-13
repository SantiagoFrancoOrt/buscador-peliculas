import { useFavorites } from '../../hooks/useFavorites.js'
import styles from './FavoriteButton.module.css'

/**
 * Boton de favorito. Tiene dos apariencias: "icono" para la esquina de las
 * tarjetas y "texto" para la pagina de detalle.
 *
 * En la grilla queda apoyado encima del enlace de la tarjeta, por eso frena la
 * propagacion del click: marcar una favorita no tiene que llevarte al detalle.
 */
function FavoriteButton({ movie, variante = 'icono' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const esFavorita = isFavorite(movie.id)

  const manejarClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(movie)
  }

  const etiqueta = esFavorita
    ? `Quitar ${movie.title} de favoritos`
    : `Agregar ${movie.title} a favoritos`

  return (
    <button
      type="button"
      className={`${styles.boton} ${styles[variante]} ${esFavorita ? styles.activo : ''}`}
      onClick={manejarClick}
      aria-pressed={esFavorita}
      aria-label={etiqueta}
      title={etiqueta}
    >
      <span aria-hidden="true">{esFavorita ? '♥' : '♡'}</span>
      {variante === 'texto' && (
        <span>{esFavorita ? 'En favoritos' : 'Agregar a favoritos'}</span>
      )}
    </button>
  )
}

export default FavoriteButton
