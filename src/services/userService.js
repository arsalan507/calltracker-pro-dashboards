import api from './api';

export const userService = {
  async getAllUsers(params = {}) {
    try {
      console.log('📡 Fetching users from /api/users (redirects to /api/super-admin/users)...');
      console.log('📡 Query params:', params);
      
      const response = await api.get('/users', { params });
      console.log('📡 Users fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      console.error('📡 Full error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      // Handle different error types
      if (error.response?.status === 404) {
        console.log('📋 User endpoints may not be implemented yet');
        return {
          data: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
          message: 'User management endpoints not yet implemented on backend'
        };
      } else if (error.response?.status === 500) {
        console.error('📋 Server error - check backend logs for details');
        return {
          data: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
          message: 'Server error loading users. Check backend logs.'
        };
      }
      
      throw error;
    }
  },

  async getOrganizationUsers(orgId, params = {}) {
    try {
      const response = await api.get(`/organizations/${orgId}/users`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData) {
    try {
      console.log('👤 Creating user with data:', userData);
      console.log('🔍 Trying to create user via /api/users (redirects to /api/super-admin/users)...');
      
      // Debug authentication
      const authToken = localStorage.getItem('authToken');
      console.log('🔐 Auth token exists:', !!authToken);
      console.log('🔐 Auth token length:', authToken?.length || 0);
      
      const response = await api.post('/users', userData);
      console.log('✅ User created successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ User creation failed:', error);
      console.error('📡 Full error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        message: error.message
      });
      
      // Enhanced error messages based on status
      if (error.response?.status === 404) {
        throw new Error('User creation endpoint not found. Backend redirect may not be working.');
      } else if (error.response?.status === 500) {
        throw new Error('Server error in user creation. Check backend logs for details.');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. You need super admin privileges.');
      }
      
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateUserRole(orgId, userId, roleData) {
    try {
      const response = await api.put(`/organizations/${orgId}/users/${userId}/role`, roleData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deactivateUser(orgId, userId) {
    try {
      const response = await api.put(`/organizations/${orgId}/users/${userId}/deactivate`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getUserAnalytics(userId) {
    try {
      const response = await api.get(`/users/${userId}/analytics`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getUserActivity(userId) {
    try {
      const response = await api.get(`/users/${userId}/activity`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;