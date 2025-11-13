import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import movieService from '../services/movieService';
import '../styles/EditMoviePage.css';

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getMovieById(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie. Please try again.');
      console.error('Error fetching movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (movieData) => {
    try {
      setUpdating(true);
      await movieService.updateMovie(id, movieData);
      navigate('/');
    } catch (err) {
      alert('Failed to update movie. Please try again.');
      console.error('Error updating movie:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading movie...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleCancel} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Edit Movie</h1>
        <p>Update movie information</p>
      </div>
      <div className="form-container">
        {updating ? (
          <div className="loading">Updating movie...</div>
        ) : (
          <MovieForm initialData={movie} onSubmit={handleSubmit} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}

export default EditMoviePage;
