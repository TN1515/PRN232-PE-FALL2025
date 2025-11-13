// API Configuration
// Automatically detects environment and uses appropriate API URL

const getApiUrl = () => {
  // Check if running in production (deployed)
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://prn232-pe-fall2025.onrender.com/api';
  }
  
  // Check if there's a local environment variable set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:5000/api';
};

export const API_URL = getApiUrl();

// Log current configuration
console.log('🌐 API Configuration:', {
  mode: import.meta.env.MODE,
  apiUrl: API_URL,
  isProduction: import.meta.env.PROD,
  envVar: import.meta.env.VITE_API_URL,
});
