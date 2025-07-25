import api from './api';

export const userService = {
  async getAllUsers(params = {}) {
    try {
      // TODO: Backend team needs to implement /api/super-admin/users endpoint
      // Currently trying /api/users which returns 404
      console.log('🔍 Trying to fetch users from /api/users...');
      const response = await api.get('/users', { params });
      return response;
    } catch (error) {
      console.error('❌ User endpoint not implemented:', error.message);
      console.log('📋 See BACKEND_USER_ENDPOINTS.md for required endpoints');
      
      // Return empty array for now to prevent UI crashes
      if (error.response?.status === 404) {
        return {
          data: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
          message: 'User management endpoints not yet implemented on backend'
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
      console.log('🔍 Trying to create user via /api/users...');
      const response = await api.post('/users', userData);
      return response;
    } catch (error) {
      console.error('❌ User creation endpoint not implemented:', error.message);
      console.log('📋 See BACKEND_USER_ENDPOINTS.md for required endpoints');
      
      // Return helpful error for 404
      if (error.response?.status === 404) {
        throw new Error('User creation endpoint not yet implemented on backend. See BACKEND_USER_ENDPOINTS.md for details.');
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