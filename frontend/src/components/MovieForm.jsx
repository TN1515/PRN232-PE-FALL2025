import { useState, useEffect } from 'react';
import '../styles/MovieForm.css';

function MovieForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: '',
    posterUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [posterMode, setPosterMode] = useState('url'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        genre: initialData.genre || '',
        rating: initialData.rating || '',
        posterUrl: initialData.posterUrl || '',
      });
      if (initialData.posterUrl) {
        setPreviewUrl(initialData.posterUrl);
        setPosterMode('url');
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Update preview for URL input
    if (name === 'posterUrl' && posterMode === 'url') {
      setPreviewUrl(value);
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePosterModeChange = (mode) => {
    setPosterMode(mode);
    if (mode === 'url') {
      setSelectedFile(null);
      setPreviewUrl(formData.posterUrl);
    } else {
      setFormData((prev) => ({ ...prev, posterUrl: '' }));
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, poster: 'Please select an image file' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors((prev) => ({ ...prev, poster: 'File size must be less than 5MB' }));
        return;
      }

      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, poster: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData((prev) => ({ ...prev, posterUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const submitData = {
        title: formData.title.trim(),
        genre: formData.genre.trim() || null,
        rating: formData.rating ? parseInt(formData.rating) : null,
        posterUrl: formData.posterUrl.trim() || null,
      };
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter movie title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="e.g., Action, Drama, Comedy"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className={errors.rating ? 'error' : ''}
          placeholder="Enter rating"
        />
        {errors.rating && <span className="error-message">{errors.rating}</span>}
      </div>

      <div className="form-group">
        <label>Poster</label>
        <div className="poster-mode-selector">
          <label className="radio-label">
            <input
              type="radio"
              name="posterMode"
              value="url"
              checked={posterMode === 'url'}
              onChange={() => handlePosterModeChange('url')}
            />
            <span>URL</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="posterMode"
              value="file"
              checked={posterMode === 'file'}
              onChange={() => handlePosterModeChange('file')}
            />
            <span>Upload File</span>
          </label>
        </div>

        {posterMode === 'url' ? (
          <input
            type="url"
            id="posterUrl"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className="poster-input"
          />
        ) : (
          <div className="file-input-container">
            <input
              type="file"
              id="posterFile"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="posterFile" className="file-input-label">
              {selectedFile ? selectedFile.name : 'Choose image file (max 5MB)'}
            </label>
          </div>
        )}
        
        {errors.poster && <span className="error-message">{errors.poster}</span>}
        
        {previewUrl && (
          <div className="poster-preview">
            <img src={previewUrl} alt="Poster preview" />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Movie' : 'Add Movie'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
