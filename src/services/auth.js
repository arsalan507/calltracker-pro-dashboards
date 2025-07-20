import api from './api';

export const authService = {
  async login(credentials) {
    try {
      // Mock authentication - replace with real API call when backend is ready
      if (credentials.email && credentials.password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful response
        const mockResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            name: 'Super Admin',
            email: credentials.email,
            role: 'super_admin'
          }
        };
        
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      // Mock logout - replace with real API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  getStoredUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  getStoredToken() {
    return localStorage.getItem('authToken');
  },

  isAuthenticated() {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  },

  isSuperAdmin() {
    const user = this.getStoredUser();
    return user?.role === 'super_admin';
  }
};

export default authService;