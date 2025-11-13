import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css';

function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${movie.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      onDelete(movie.id);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="no-rating">Not rated</span>;
    return '⭐'.repeat(rating);
  };

  return (
    <div className="movie-card">
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
      ) : (
        <div className="movie-poster-placeholder">
          <span>🎬</span>
        </div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        {movie.genre && <p className="movie-genre">{movie.genre}</p>}
        <div className="movie-rating">{renderStars(movie.rating)}</div>
        <div className="movie-actions">
          <button onClick={handleEdit} className="btn btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
