import api from './api';

class TicketService {
  // Get all tickets with filtering and pagination
  async getTickets(filters = {}) {
    const params = new URLSearchParams();
    
    // Add filters to query params
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    try {
      const response = await api.get(`/tickets?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error(error.message || 'Failed to fetch tickets');
    }
  }

  // Get tickets assigned to current user
  async getMyTickets(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    try {
      const response = await api.get(`/tickets/my?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching my tickets:', error);
      throw new Error(error.message || 'Failed to fetch my tickets');
    }
  }

  // Get overdue tickets
  async getOverdueTickets(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    try {
      const response = await api.get(`/tickets/overdue?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching overdue tickets:', error);
      throw new Error(error.message || 'Failed to fetch overdue tickets');
    }
  }

  // Get single ticket by ID
  async getTicket(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      return response;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw new Error(error.message || 'Failed to fetch ticket');
    }
  }

  // Create new ticket
  async createTicket(ticketData) {
    try {
      const response = await api.post('/tickets', ticketData);
      return response;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error(error.message || 'Failed to create ticket');
    }
  }

  // Update existing ticket
  async updateTicket(ticketId, updateData) {
    try {
      const response = await api.put(`/tickets/${ticketId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error(error.message || 'Failed to update ticket');
    }
  }

  // Archive (soft delete) ticket
  async archiveTicket(ticketId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}`);
      return response;
    } catch (error) {
      console.error('Error archiving ticket:', error);
      throw new Error(error.message || 'Failed to archive ticket');
    }
  }

  // Get ticket history/audit trail
  async getTicketHistory(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}/history`);
      return response;
    } catch (error) {
      console.error('Error fetching ticket history:', error);
      throw new Error(error.message || 'Failed to fetch ticket history');
    }
  }

  // Get ticket notes
  async getTicketNotes(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}/notes`);
      return response;
    } catch (error) {
      console.error('Error fetching ticket notes:', error);
      throw new Error(error.message || 'Failed to fetch ticket notes');
    }
  }

  // Add note to ticket
  async addTicketNote(ticketId, noteData) {
    try {
      const response = await api.post(`/tickets/${ticketId}/notes`, noteData);
      return response;
    } catch (error) {
      console.error('Error adding ticket note:', error);
      throw new Error(error.message || 'Failed to add ticket note');
    }
  }

  // Get ticket statistics
  async getTicketStats(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    try {
      const response = await api.get(`/tickets/stats?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching ticket stats:', error);
      throw new Error(error.message || 'Failed to fetch ticket statistics');
    }
  }

  // Bulk operations
  async bulkUpdateTickets(ticketIds, updateData) {
    try {
      const response = await api.post('/tickets/bulk-update', {
        ticketIds,
        updateData
      });
      return response;
    } catch (error) {
      console.error('Error bulk updating tickets:', error);
      throw new Error(error.message || 'Failed to bulk update tickets');
    }
  }

  async bulkArchiveTickets(ticketIds) {
    try {
      const response = await api.post('/tickets/bulk-archive', {
        ticketIds
      });
      return response;
    } catch (error) {
      console.error('Error bulk archiving tickets:', error);
      throw new Error(error.message || 'Failed to bulk archive tickets');
    }
  }

  // Export tickets
  async exportTickets(filters = {}, format = 'csv') {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    
    params.append('format', format);

    try {
      const response = await api.get(`/tickets/export?${params.toString()}`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Error exporting tickets:', error);
      throw new Error(error.message || 'Failed to export tickets');
    }
  }

  // Integration with call logs
  async createTicketFromCall(callLogId, ticketData) {
    try {
      const response = await api.post(`/call-logs/${callLogId}/create-ticket`, ticketData);
      return response;
    } catch (error) {
      console.error('Error creating ticket from call:', error);
      throw new Error(error.message || 'Failed to create ticket from call');
    }
  }

  async linkTicketToCall(callLogId, ticketId) {
    try {
      const response = await api.put(`/call-logs/${callLogId}/link-ticket`, {
        ticketId
      });
      return response;
    } catch (error) {
      console.error('Error linking ticket to call:', error);
      throw new Error(error.message || 'Failed to link ticket to call');
    }
  }

  async unlinkTicketFromCall(callLogId) {
    try {
      const response = await api.delete(`/call-logs/${callLogId}/unlink-ticket`);
      return response;
    } catch (error) {
      console.error('Error unlinking ticket from call:', error);
      throw new Error(error.message || 'Failed to unlink ticket from call');
    }
  }

  // Get calls without tickets
  async getCallsWithoutTickets(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    try {
      const response = await api.get(`/call-logs/without-tickets?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching calls without tickets:', error);
      throw new Error(error.message || 'Failed to fetch calls without tickets');
    }
  }

  // Get ticket creation analytics from calls
  async getCallTicketStats() {
    try {
      const response = await api.get('/call-logs/ticket-stats');
      return response;
    } catch (error) {
      console.error('Error fetching call ticket stats:', error);
      throw new Error(error.message || 'Failed to fetch call ticket statistics');
    }
  }
}

export const ticketService = new TicketService();
export default ticketService;