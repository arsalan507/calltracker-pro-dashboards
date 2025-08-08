import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../../components/common';
import { ticketService } from '../../services/ticketService';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  PencilIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  TagIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  PaperClipIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canEditTickets } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🎫 Fetching ticket details for ID:', id);
      const response = await ticketService.getTicket(id);
      console.log('🎫 Ticket response:', response);
      setTicket(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      
      // Provide fallback ticket data for demonstration purposes
      console.warn('🔄 Using fallback ticket data due to backend error');
      const fallbackTicket = {
        id: id,
        _id: id,
        title: `Sample Ticket ${id}`,
        description: `This is a sample ticket description for ticket ${id}. In a real application, this data would come from the backend API.

**Issue Details:**
- Customer is experiencing login issues
- Error occurs when trying to access dashboard
- Browser: Chrome 118
- Device: Desktop Windows 11

**Steps to Reproduce:**
1. Navigate to login page
2. Enter valid credentials
3. Click "Login" button
4. Error message appears

**Expected Result:**
User should be redirected to dashboard

**Actual Result:**
"Authentication failed" error message displayed`,
        status: 'open',
        priority: 'medium',
        category: 'technical-support',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1 (555) 123-4567',
        assignedTo: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          id: 'agent-1'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        tags: ['login-issue', 'authentication', 'urgent'],
        source: 'email',
        resolution: null,
        estimatedHours: 2,
        actualHours: 0,
        slaStatus: 'on-track',
        lastActivity: new Date().toISOString(),
        notes: [
          {
            id: 'note-1',
            content: 'Initial ticket created from customer email',
            author: 'System',
            createdAt: new Date().toISOString(),
            type: 'system'
          },
          {
            id: 'note-2', 
            content: 'Assigned to Sarah Wilson for investigation',
            author: 'Manager',
            createdAt: new Date().toISOString(),
            type: 'assignment'
          }
        ],
        attachments: [],
        relatedTickets: []
      };
      
      setTicket(fallbackTicket);
      toast.error(`Failed to load real ticket data. Backend error: ${error.message}. Showing sample ticket data.`);
    } finally {
      setLoading(false);
    }
  }, [id]); // navigate is stable and doesn't need to be in deps

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket not found</h2>
        <Button onClick={() => navigate('/dashboard/crm/tickets')}>
          Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/crm/tickets')}
            className="flex items-center space-x-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Tickets</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ticket.title}</h1>
            <p className="text-gray-600 mt-2">Ticket #{ticket.id || ticket._id}</p>
          </div>
        </div>
        {canEditTickets() && (
          <Button
            onClick={() => navigate(`/dashboard/crm/tickets/${id}?mode=edit`)}
            className="flex items-center space-x-2"
          >
            <PencilIcon className="w-5 h-5" />
            <span>Edit Ticket</span>
          </Button>
        )}
      </motion.div>

      {/* Ticket Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </Card>

          {/* Notes and Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
              <span>Notes & Activity</span>
            </h2>
            {ticket.notes && ticket.notes.length > 0 ? (
              <div className="space-y-4">
                {ticket.notes.map((note) => (
                  <div key={note.id} className="border-l-4 border-primary-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{note.author}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          note.type === 'system' ? 'bg-gray-100 text-gray-800' :
                          note.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                          'bg-primary-100 text-primary-800'
                        }`}>
                          {note.type?.replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notes or activity yet</p>
              </div>
            )}
          </Card>

          {/* Attachments */}
          {ticket.attachments && ticket.attachments.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <PaperClipIcon className="w-6 h-6" />
                <span>Attachments</span>
              </h2>
              <div className="space-y-2">
                {ticket.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <PaperClipIcon className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{attachment.name}</p>
                      <p className="text-sm text-gray-500">{attachment.size} • {attachment.type}</p>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Ticket Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(ticket.status)}
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Priority</label>
                <div className="flex items-center space-x-2 mt-1">
                  {getPriorityIcon(ticket.priority)}
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority?.replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              {ticket.category && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-sm text-gray-900 mt-1 capitalize">{ticket.category?.replace('-', ' ')}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Assigned To</label>
                <div className="flex items-center space-x-2 mt-1">
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{ticket.assignedTo?.name || 'Unassigned'}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Source</label>
                <p className="text-sm text-gray-900 mt-1 capitalize">{ticket.source || 'Unknown'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <div className="flex items-center space-x-2 mt-1">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {new Date(ticket.createdAt).toLocaleDateString()} {new Date(ticket.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {ticket.dueDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {new Date(ticket.dueDate).toLocaleDateString()} {new Date(ticket.dueDate).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )}
              {ticket.estimatedHours && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Time Estimate</label>
                  <p className="text-sm text-gray-900 mt-1">{ticket.estimatedHours} hours</p>
                </div>
              )}
              {ticket.slaStatus && (
                <div>
                  <label className="text-sm font-medium text-gray-500">SLA Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.slaStatus === 'on-track' ? 'bg-green-100 text-green-800' :
                      ticket.slaStatus === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ticket.slaStatus?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Tags */}
          {ticket.tags && ticket.tags.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TagIcon className="w-5 h-5" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {ticket.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Customer Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{ticket.customerName || ticket.customer?.name}</span>
              </div>
              {ticket.customerEmail && (
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${ticket.customerEmail}`} className="text-primary-600 hover:text-primary-700">
                    {ticket.customerEmail}
                  </a>
                </div>
              )}
              {ticket.customerPhone && (
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${ticket.customerPhone}`} className="text-primary-600 hover:text-primary-700">
                    {ticket.customerPhone}
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper Functions
const getStatusIcon = (status) => {
  switch (status) {
    case 'open':
    case 'new':
      return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
    case 'in-progress':
      return <ClockIcon className="w-4 h-4 text-blue-500" />;
    case 'resolved':
    case 'closed':
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    default:
      return <ExclamationTriangleIcon className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
    case 'new':
      return 'bg-yellow-100 text-yellow-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
    case 'closed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'urgent':
    case 'high':
      return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
    case 'medium':
      return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
    case 'low':
      return <ExclamationTriangleIcon className="w-4 h-4 text-gray-500" />;
    default:
      return <ExclamationTriangleIcon className="w-4 h-4 text-gray-500" />;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent':
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default TicketDetails;