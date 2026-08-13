import { Link } from 'react-router-dom'
import Message from '../components/Message/Message.jsx'

function NotFound() {
  return (
    <div className="container">
      <Message icon="🍿" title="Esta pagina no existe">
        La direccion que abriste no corresponde a ninguna seccion de la app.{' '}
        <Link to="/">Volver al inicio</Link>
      </Message>
    </div>
  )
}

export default NotFound
