import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../../components/common';
import { ticketService } from '../../services/ticketService';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  PencilIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canEditTickets } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTicket(id);
      setTicket(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket details');
      navigate('/dashboard/crm/tickets');
    } finally {
      setLoading(false);
    }
  };

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

          {/* Notes and History would go here */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes & History</h2>
            <p className="text-gray-500 text-center py-8">Notes and history functionality coming soon...</p>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Ticket Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-lg font-semibold text-gray-900 capitalize">{ticket.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Priority</label>
                <p className="text-lg font-semibold text-gray-900 capitalize">{ticket.priority}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Assigned To</label>
                <p className="text-lg font-semibold text-gray-900">{ticket.assignedTo?.name || 'Unassigned'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              {ticket.dueDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(ticket.dueDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </Card>

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

export default TicketDetails;