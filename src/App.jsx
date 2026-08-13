import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import styles from './App.module.css'

/** Layout comun a todas las paginas: cabecera fija, contenido y pie. */
function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
