import { useParams } from 'react-router-dom'

function MovieDetail() {
  const { id } = useParams()

  return (
    <div className="container">
      <h1>Detalle de la pelicula {id}</h1>
    </div>
  )
}

export default MovieDetail
