import api from './api';

export const organizationService = {
  async getAllOrganizations(params = {}) {
    try {
      const response = await api.get('/organizations', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getOrganization(orgId) {
    try {
      const response = await api.get(`/organizations/${orgId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateOrganization(orgId, data) {
    try {
      const response = await api.put(`/organizations/${orgId}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getOrganizationUsers(orgId) {
    try {
      const response = await api.get(`/organizations/${orgId}/users`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getOrganizationAnalytics(orgId) {
    try {
      const response = await api.get(`/organizations/${orgId}/analytics`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createOrganization(orgData) {
    try {
      const response = await api.post('/organizations', orgData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteOrganization(orgId) {
    try {
      const response = await api.delete(`/organizations/${orgId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default organizationService;