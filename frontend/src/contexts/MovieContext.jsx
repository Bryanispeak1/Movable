import {createContext, useState, useContext,useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
     const [Favorites, setFavorites] = useState([])
     useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(Favorites))
    }, [Favorites])

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
        return Favorites.some((movie) => movie.id === movieId)
    }
    <MovieContext.provider value={{Favorites, addToFavorites, removeFromFavorites, isFavorite}}>
        {children}
    </MovieContext.provider>
    const value = {
        Favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}