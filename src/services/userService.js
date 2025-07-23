import api from './api';

export const userService = {
  async getAllUsers(params = {}) {
    try {
      // For super admin - get all users across all organizations
      const response = await api.get('/users', { params });
      return response;
    } catch (error) {
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
      const response = await api.post('/users', userData);
      return response;
    } catch (error) {
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