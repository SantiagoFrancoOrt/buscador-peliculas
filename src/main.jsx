import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import { FavoritesProvider } from './context/FavoritesProvider.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Favorites from './pages/Favorites.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          {/* App es el layout: todas las paginas se dibujan dentro de su <Outlet /> */}
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
