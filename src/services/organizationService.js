import api from './api';

export const organizationService = {
  // Test API connectivity
  async testConnection() {
    try {
      console.log('🔍 Testing API connection...');
      const response = await api.get('/');
      console.log('✅ API connection test successful:', response);
      return response;
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      throw error;
    }
  },

  async getAllOrganizations(params = {}) {
    try {
      console.log('📡 Fetching all organizations - using fallback mock data since super admin endpoints not deployed');
      // Since super admin endpoints are not deployed, return mock data
      const mockResponse = {
        success: true,
        data: [],
        message: 'No organizations found - super admin endpoints not yet deployed'
      };
      console.log('📡 Using mock organizations data:', mockResponse);
      return mockResponse;
    } catch (error) {
      console.error('📡 Error fetching organizations:', error);
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
    console.log('❌ Organization creation not available');
    console.log('❌ Super admin endpoints are not deployed on the backend');
    console.log('❌ Available endpoints:', [
      'GET /api/call-logs/test',
      'POST /api/call-logs', 
      'GET /api/call-logs',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile'
    ]);
    
    throw new Error(
      'Organization creation is not available. The backend super admin endpoints have not been deployed yet. ' +
      'Please deploy the super admin endpoints to enable organization management functionality.'
    );
  },

  async deleteOrganization(orgId) {
    console.log('❌ Organization deletion not available');
    console.log('❌ Super admin endpoints are not deployed on the backend');
    
    throw new Error(
      'Organization deletion is not available. The backend super admin endpoints have not been deployed yet.'
    );
  }
};

export default organizationService;