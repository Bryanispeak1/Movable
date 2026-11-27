import './css/App.css'
import Home from "./pages/home"
import {Routes, Route} from "react-router-dom"
import Favorites from './pages/favorites'
import NavBar from './components/Navbar'
import { MovieProvider } from './contexts/MovieContext'
import Watchlist from './pages/watchlist'
import Anime from './pages/Anime'
import { useState, useEffect } from "react";

// Inside your App component, right before return:

function App() {
  const [showSplash, setShowSplash] = useState(
  () => !sessionStorage.getItem("hasSeenIntro")
);

useEffect(() => {
  if (!showSplash) return;
  const timer = setTimeout(() => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  }, 1400);
  return () => clearTimeout(timer);
}, [showSplash]);

  return (
    <MovieProvider>
      {showSplash && (
  <div className="splash-screen">
    <h1 className="splash-logo">
      Cine<span>Pulse</span>
    </h1>
  </div>
)}
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
