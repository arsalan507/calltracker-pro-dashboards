import api from './api';

export const organizationService = {
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
      console.log('📡 Creating organization through super admin endpoint:', {
        name: orgData.name,
        domain: orgData.domain
      });
      
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
      
      const response = await api.post('/super-admin/organizations', organizationData);
      console.log('📡 Organization created successfully:', response);
      
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
      
      return transformedResponse;
    } catch (error) {
      console.error('📡 Super admin API call failed:', error);
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