import { useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid/MovieGrid.jsx'
import Spinner from '../components/Spinner/Spinner.jsx'
import Message from '../components/Message/Message.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import { useMovies } from '../hooks/useMovies.js'
import styles from './Home.module.css'

function Home() {
  // Lo que se ve escrito en el input, letra por letra
  const [texto, setTexto] = useState('')
  // Lo que realmente se busca: recien 400 ms despues de dejar de escribir
  const busqueda = useDebounce(texto.trim(), 400)

  const { movies, loading, error, reintentar } = useMovies(busqueda)

  return (
    <div className="container">
      <SearchBar value={texto} onChange={setTexto} />

      <h1 className={styles.titulo}>
        {busqueda ? `Resultados para "${busqueda}"` : 'Peliculas populares'}
      </h1>

      {loading && <Spinner />}

      {!loading && error && (
        <Message icon="⚠️" title="Algo salio mal" onRetry={reintentar}>
          {error}
        </Message>
      )}

      {!loading && !error && movies.length === 0 && (
        <Message icon="🔍" title="Sin resultados">
          No encontramos peliculas para "{busqueda}". Proba con otro titulo.
        </Message>
      )}

      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  )
}

export default Home
