import {createContext, useState, useContext,useEffect} from "react"

const MovieContext = createContext()
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState(() => {
const storedFavs = localStorage.getItem("favorites");
return storedFavs ? JSON.parse(storedFavs) : [];
});

const [watchlist, setWatchlist] = useState(() => {
const stored = localStorage.getItem("watchlist");
return stored ? JSON.parse(stored) : [];
});

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist])

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromFavorites =(movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
    }
    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId)
    }

      const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.some((item) => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWatchlist =(movieId) => {
        setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId))
    }
    const isInWatchlist = (movieId) => {
        return watchlist.some((movie) => movie.id === movieId)
    }
    <MovieContext.Provider value={{favorites, addToFavorites, removeFromFavorites, isFavorite, watchlist, addToWatchlist, removeFromWatchlist,isInWatchlist}}>
        {children}
    </MovieContext.Provider>
    const value ={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}