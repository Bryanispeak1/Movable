import "../css/Moviecard.css"
import {useMovieContext} from "../contexts/MovieContext"

function Moviecard({movie, onSelect}) {
  const {isFavorite,addToFavorites,removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist, } = useMovieContext()
  const favorite = isFavorite(movie.id);
  const watchlisted =isInWatchlist(movie.id)

    function onfavoriteclick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
          else addToFavorites(movie)
    }

     function onWatchlistclick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (Watchlisted) removeFromWatchlist(movie.id)
          else addToWatchlist(movie)
    }

      return(
       <div className="movie-card" onClick={() => onSelect(movie)}>
      <div className="movie-poster">
        <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title}/>
        <div className="movie-overlay">
            <button
             className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onfavoriteclick}>
                  ❤ 
            </button>
            <button
            className={`watchList-btn ${watchlisted ? "active" : ""}`}
            onClick={onWatchlistclick}
            title={watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {watchlisted ? "✓" : "+"}
            </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
      </div>
)}

export default Moviecard;