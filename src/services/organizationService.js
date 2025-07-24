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
      console.log('📡 Fetching all organizations for super admin');
      const response = await api.get('/super-admin/organizations', { params });
      console.log('📡 Organizations fetched successfully:', response);
      return response;
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
    try {
      console.log('🔍 DEBUG: Starting organization creation...');
      console.log('🔍 DEBUG: Input data:', orgData);
      
      // Check authentication token
      const token = localStorage.getItem('authToken');
      console.log('🔍 DEBUG: Auth token exists:', !!token);
      console.log('🔍 DEBUG: Auth token (first 20 chars):', token ? token.substring(0, 20) + '...' : 'None');
      
      // Check current user info
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('🔍 DEBUG: Current user:', currentUser);
      console.log('🔍 DEBUG: User role:', currentUser.role);
      
      // Use the new super admin endpoint for creating organizations
      const organizationData = {
        name: orgData.name,
        domain: orgData.domain,
        description: orgData.description || '',
        plan: orgData.plan || 'basic',
        adminUser: {
          firstName: 'Admin',
          lastName: 'User',
          email: `admin@${orgData.domain}`,
          password: 'TempPassword123!' // This should be changed by the admin
        }
      };
      
      console.log('📡 Making API call to:', '/super-admin/organizations');
      console.log('📡 With data:', organizationData);
      console.log('📡 API base URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      
      const response = await api.post('/super-admin/organizations', organizationData);
      console.log('✅ API call successful! Response:', response);
      
      // The response should already be in the expected format from the backend
      // But let's ensure it matches frontend expectations
      const transformedResponse = {
        data: {
          _id: response.organization._id,
          name: response.organization.name,
          domain: response.organization.domain,
          description: response.organization.description,
          plan: response.organization.plan,
          isActive: response.organization.isActive,
          phone: orgData.phone || '',
          website: orgData.website || '',
          address: orgData.address || '',
          userCount: 1, // The admin user just created
          createdAt: response.organization.createdAt,
          lastActivityAt: response.organization.lastActivityAt,
          settings: response.organization.settings || {},
          adminUser: {
            id: response.adminUser._id,
            email: response.adminUser.email,
            name: `${response.adminUser.firstName} ${response.adminUser.lastName}`,
            role: response.adminUser.role,
            tempPassword: 'TempPassword123!' // To show to super admin
          }
        }
      };
      
      console.log('✅ Transformed response:', transformedResponse);
      return transformedResponse;
    } catch (error) {
      console.error('❌ Organization creation failed!');
      console.error('❌ Error details:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error request:', error.request);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error data:', error.response?.data);
      
      throw error;
    }
  },

  async deleteOrganization(orgId) {
    try {
      console.log('📡 Deleting organization via super admin endpoint:', orgId);
      const response = await api.delete(`/super-admin/organizations/${orgId}`);
      console.log('📡 Organization deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('📡 Error deleting organization:', error);
      throw error;
    }
  }
};

export default organizationService;