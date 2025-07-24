import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('🚨 API Error Details:', {
      message: error.message,
      response: error.response,
      request: error.request,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }

    // Handle different types of errors more clearly
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error.response.data || { message: `Server error: ${error.response.status}` });
    } else if (error.request) {
      // Request was made but no response received (network error, CORS, etc.)
      return Promise.reject({ 
        message: 'Network error: Unable to reach server. Please check if the backend is running and CORS is configured.',
        type: 'network_error',
        originalError: error.message
      });
    } else {
      // Something else happened
      return Promise.reject({ 
        message: error.message || 'Unknown error occurred',
        type: 'unknown_error'
      });
    }
  }
);

export default api;