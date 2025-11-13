import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Movie API Service
const movieService = {
  // Get all movies
  getAllMovies: async () => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie ${id}:`, error);
      throw error;
    }
  },

  // Create new movie
  createMovie: async (movieData) => {
    try {
      const response = await api.post('/movies', movieData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  // Update movie
  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error(`Error updating movie ${id}:`, error);
      throw error;
    }
  },

  // Delete movie
  deleteMovie: async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting movie ${id}:`, error);
      throw error;
    }
  },
};

export default movieService;
