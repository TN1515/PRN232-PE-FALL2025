import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import movieService from '../services/movieService';
import '../styles/AddMoviePage.css';

function AddMoviePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (movieData) => {
    try {
      setLoading(true);
      await movieService.createMovie(movieData);
      navigate('/');
    } catch (err) {
      alert('Failed to add movie. Please try again.');
      console.error('Error creating movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Movie</h1>
        <p>Add a new movie to your watchlist</p>
      </div>
      <div className="form-container">
        {loading ? (
          <div className="loading">Adding movie...</div>
        ) : (
          <MovieForm onSubmit={handleSubmit} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}

export default AddMoviePage;
