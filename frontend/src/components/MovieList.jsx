import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

function MovieList({ movies, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    let result = [...movies];

    // Search by title
    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (filterGenre) {
      result = result.filter(
        (movie) => movie.genre && movie.genre.toLowerCase() === filterGenre.toLowerCase()
      );
    }

    // Sort movies
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredMovies(result);
  }, [movies, searchTerm, filterGenre, sortBy]);

  // Get unique genres
  const genres = [...new Set(movies.map((m) => m.genre).filter(Boolean))];

  return (
    <div className="movie-list-container">
      <div className="movie-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="createdAt">Newest First</option>
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="no-movies">
          <p>No movies found. Add your first movie to get started!</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
