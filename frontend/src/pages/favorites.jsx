import "../css/Favorites.css"
import {useMovieContext} from "../contexts/MovieContext"
import Moviecard from "../components/Moviecard"
function Favorites() {
    const {Favorites} = useMovieContext();
    if (Favorites) {
        return <div className="favorites"> 
            <h2>Your Favorite Movies</h2>
            <div className="movies-grid">
            {Favorites.map ((movie) => (
                <Moviecard movie={movie} key= {movie.id} />
            ))}
        </div>
        </div>
    }
    return <div className="favorites-empty">
        <h2>No favorite Movies yet</h2>
        <p>Start adding to your favorites and they'll appear here.</p>
    </div>
}


export default Favorites