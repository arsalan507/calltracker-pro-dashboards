import api from './api';

export const userService = {
  async getAllUsers(params = {}) {
    try {
      console.log('📡 Fetching all users from super admin endpoint...');
      console.log('📡 Query params:', params);
      
      // Use direct fetch with super admin endpoint
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const url = new URL('/api/super-admin/users', 'https://calltrackerpro-backend.vercel.app');
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      console.log('📡 Fetching from URL:', url.toString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      console.log('📡 Users response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error:', response.status, errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You need super admin privileges.');
        } else if (response.status === 404) {
          console.log('📋 Super admin users endpoint not found');
          return {
            data: [],
            pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
            message: 'Super admin users endpoint not yet implemented on backend'
          };
        } else if (response.status === 500) {
          console.error('📋 Server error - check backend logs for details');
          return {
            data: [],
            pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
            message: 'Server error loading users. Check backend logs.'
          };
        } else {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }
      
      const result = await response.json();
      console.log('📡 Users fetched successfully:', result);
      return { data: result.data || result }; // Handle different response formats
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      throw error;
    }
  },

  async getOrganizationUsers(orgId, params = {}) {
    try {
      console.log('📡 Fetching organization users from super admin endpoint...');
      console.log('📡 Organization ID:', orgId);
      console.log('📡 Query params:', params);
      
      // Use direct fetch with super admin endpoint
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const url = new URL(`/api/super-admin/organizations/${orgId}/users`, 'https://calltrackerpro-backend.vercel.app');
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      console.log('📡 Fetching from URL:', url.toString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      console.log('📡 Organization users response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error:', response.status, errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You need super admin privileges.');
        } else if (response.status === 404) {
          throw new Error('Organization users endpoint not found.');
        } else {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }
      
      const result = await response.json();
      console.log('📡 Organization users fetched successfully:', result);
      return { data: result.data || result }; // Handle different response formats
    } catch (error) {
      console.error('❌ Error fetching organization users:', error);
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