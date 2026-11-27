import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/Moviecard";

function Watchlist({ onSelect }) {
const { watchlist } = useMovieContext();

if (watchlist && watchlist.length > 0) {
return (
<div className="favorites">
<h2>Your Watchlist</h2>
<div className="movies-grid">
{watchlist.map((movie) => (
<MovieCard movie={movie} key={movie.id} onSelect={onSelect} />
))}
</div>
</div>
);
}

return (
<div className="favorites-empty">
<h2>Your Watchlist is Empty</h2>
<p>Click + on any movie card to save it to watch later.</p>
</div>
);
}

export default Watchlist;
