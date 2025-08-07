
const API_BASE_URL = 'https://calltrackerpro-backend.vercel.app/api';

export const demoService = {
  // Submit demo request
  async submitDemo(demoData) {
    try {
      console.log('📝 Submitting demo request:', demoData);
      
      const response = await fetch(`${API_BASE_URL}/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to submit demo: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Demo submitted successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Demo submission failed:', error);
      throw error;
    }
  },

  // Fetch all demos (for super admin)
  async getAllDemos(filters = {}) {
    try {
      const token = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams();

      // Add filters if provided
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.urgency) queryParams.append('urgency', filters.urgency);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);

      const url = `${API_BASE_URL}/demo-requests${queryParams.toString() ? 
        '?' + queryParams.toString() : ''}`;

      console.log('📡 Fetching demos from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 500) {
          // Handle backend table not ready gracefully
          console.warn('Demo requests table not ready yet - using empty data');
          return {
            success: true,
            data: [],
            pagination: {
              page: 1,
              limit: 20,
              total: 0,
              totalPages: 0,
              hasNext: false,
              hasPrev: false
            }
          };
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch demos: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📊 Demos fetched:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch demos:', error);
      throw error;
    }
  },

  // Get demo analytics
  async getDemoAnalytics() {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/demo-requests/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 500) {
          // Handle backend analytics not ready gracefully
          console.warn('Demo requests analytics not ready yet - using fallback data');
          return {
            success: true,
            data: {
              totalRequests: 0,
              urgencyBreakdown: { urgent: 0, planned: 0, exploring: 0 },
              priorityDistribution: { high: 0, medium: 0, low: 0 },
              conversionRate: 0
            }
          };
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch demo analytics: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📈 Analytics fetched:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch demo analytics:', error);
      throw error;
    }
  },

  // Update demo request status
  async updateDemoStatus(demoId, status) {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/demo-requests/${demoId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update demo status: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Demo status updated:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to update demo status:', error);
      throw error;
    }
  }
};

export default demoService;