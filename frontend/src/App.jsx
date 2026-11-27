import './css/App.css'
import Home from "./pages/home"
import {Routes, Route} from "react-router-dom"
import Favorites from './pages/favorites'
import NavBar from './components/Navbar'
import { MovieProvider } from './contexts/MovieContext'
import Watchlist from './pages/watchlist'
import Anime from './pages/Anime'
function App() {
  return (
    <MovieProvider>
      <NavBar/>
   <main className="main-content">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/favorites" element={<Favorites />}/>
      <Route path="/watchlist" element={<Watchlist/>}/>
      <Route path="/anime" element={<Anime/>}/>
    </Routes>
   </main>
   </MovieProvider>
  )
}


export default App
