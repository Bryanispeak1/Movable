import { useState, useEffect } from "react";
import Moviecard from "../components/Moviecard";
import { getTopAnime, searchAnime } from "../services/animeApi";

function Anime() {
  // 1. All state variables live INSIDE function Anime()
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Load top anime when the page first opens
  useEffect(() => {
    const loadTopAnime = async () => {
      try {
        const popularAnime = await getTopAnime();
        setAnimeList(popularAnime);
      } catch (err) {
        console.log(err);
        setError("Failed to load anime...");
      } finally {
        setLoading(false);
      }
    };

    loadTopAnime();
  }, []);

  // 3. Handle searching when the user submits the form
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const results = await searchAnime(searchQuery);
      setAnimeList(results);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search anime...");
    } finally {
      setLoading(false);
    }
  };

  // 4. Return the UI (still INSIDE function Anime())
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Anime......."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading......</div>
      ) : (
        <div className="movies-grid">
          {animeList.map((anime) => (
            <Moviecard
              movie={anime}
              key={anime.id}
              onSelect={setSelectedAnime}
            />
          ))}
        </div>
      )}

      {selectedAnime && (
        <div className="player-modal" onClick={() => setSelectedAnime(null)}>
          <div
            className="player-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="player-header">
              <h3>{selectedAnime.title}</h3>
              <button onClick={() => setSelectedAnime(null)}>X</button>
            </div>
            <iframe
              src={`https://bingeapi.st/embed/anime/${selectedAnime.id}`}
              title={selectedAnime.title}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
} // <--- Notice the box closes here at the VERY BOTTOM

export default Anime;