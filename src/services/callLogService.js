import api from './api';

export const callLogService = {
  async getCallLogs(params = {}) {
    try {
      const response = await api.get('/call-logs', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createCallLog(callLogData) {
    try {
      const response = await api.post('/call-logs', callLogData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getCallLog(callLogId) {
    try {
      const response = await api.get(`/call-logs/${callLogId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateCallLog(callLogId, callLogData) {
    try {
      const response = await api.put(`/call-logs/${callLogId}`, callLogData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteCallLog(callLogId) {
    try {
      const response = await api.delete(`/call-logs/${callLogId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default callLogService;