import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import movieService from '../services/movieService';
import '../styles/HomePage.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await movieService.deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      alert('Failed to delete movie. Please try again.');
      console.error('Error deleting movie:', err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchMovies} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Movie Watchlist</h1>
        <p className="movie-count">
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your watchlist
        </p>
      </div>
      <MovieList movies={movies} onDelete={handleDelete} />
    </div>
  );
}

export default HomePage;
