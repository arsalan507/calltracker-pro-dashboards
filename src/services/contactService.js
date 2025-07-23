import api from './api';

export const contactService = {
  async getContacts(params = {}) {
    try {
      const response = await api.get('/contacts', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createContact(contactData) {
    try {
      const response = await api.post('/contacts', contactData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getContact(contactId) {
    try {
      const response = await api.get(`/contacts/${contactId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateContact(contactId, contactData) {
    try {
      const response = await api.put(`/contacts/${contactId}`, contactData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteContact(contactId) {
    try {
      const response = await api.delete(`/contacts/${contactId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default contactService;