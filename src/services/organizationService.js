import api from './api';

export const organizationService = {
  // Test API connectivity
  async testConnection() {
    try {
      console.log('🔍 Testing API connection...');
      const response = await api.get('/');
      console.log('✅ API connection test successful:', response);
      
      // Also test super admin endpoint availability
      try {
        console.log('🔍 Testing super admin endpoints...');
        const superAdminResponse = await api.get('/super-admin/organizations');
        console.log('✅ Super admin endpoints available:', superAdminResponse);
        return { ...response, superAdminAvailable: true };
      } catch (superAdminError) {
        console.log('❌ Super admin endpoints not available:', superAdminError.message);
        return { ...response, superAdminAvailable: false, superAdminError: superAdminError.message };
      }
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      throw error;
    }
  },

  async getAllOrganizations(params = {}) {
    try {
      console.log('📡 Fetching all organizations from super admin endpoint');
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
      console.log('🏢 Creating organization with super admin endpoint');
      console.log('🏢 Input data:', orgData);
      
      // Prepare data in the format expected by the backend
      const organizationData = {
        name: orgData.name,
        domain: orgData.domain,
        description: orgData.description || '',
        plan: orgData.plan || 'basic',
        adminUser: {
          firstName: 'Admin',
          lastName: 'User',
          email: `admin@${orgData.domain}`,
          password: 'TempPassword123!'
        }
      };
      
      console.log('📡 Making API call to create organization:', organizationData);
      const response = await api.post('/super-admin/organizations', organizationData);
      console.log('✅ Organization created successfully:', response);
      
      return response;
    } catch (error) {
      console.error('❌ Organization creation failed:', error);
      throw error;
    }
  },

  async deleteOrganization(orgId) {
    try {
      console.log('🗑️ Deleting organization via super admin endpoint:', orgId);
      // The backend requires confirmDelete: true for safety
      const response = await api.delete(`/super-admin/organizations/${orgId}`, {
        data: { confirmDelete: true }
      });
      console.log('✅ Organization deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ Error deleting organization:', error);
      throw error;
    }
  },

  async updateOrganization(orgId, data) {
    try {
      console.log('✏️ Updating organization via super admin endpoint:', orgId, data);
      const response = await api.put(`/super-admin/organizations/${orgId}`, data);
      console.log('✅ Organization updated successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ Error updating organization:', error);
      throw error;
    }
  }
};

export default organizationService;