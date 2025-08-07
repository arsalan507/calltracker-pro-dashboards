import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  EyeIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { Card, Button } from '../../components/common';
import { formatDistanceToNow } from 'date-fns';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    urgency: 'all',
    status: 'all',
    timeline: 'all'
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const metrics = {
    totalLeads: 156,
    highPriorityCount: 23,
    urgentCount: 8,
    conversionRate: '23%',
    trends: {
      total: '+12%',
      highPriority: '+5%',
      urgent: '+8%',
      conversion: '+3%'
    }
  };

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockLeads = [
      {
        id: '1',
        name: 'Arsalan Ahmed',
        email: 'arsalanahmed507@gmail.com',
        company: '567890',
        phone: '0538180217',
        urgency: 'urgent',
        currentPain: 'wasted-ad-spend',
        budget: '5k-10k',
        timeline: 'this-week',
        message: 'Need better call tracking ASAP!',
        priority: 'high',
        segment: 'enterprise',
        leadScore: 95,
        status: 'new',
        followUpDate: new Date(Date.now() - 86400000), // Yesterday (overdue)
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 1800000)
      },
      {
        id: '2',
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'Tech Corp',
        phone: '+1234567890',
        urgency: 'planned',
        currentPain: 'poor-roi-tracking',
        budget: '1k-5k',
        timeline: 'this-month',
        message: 'Looking for ROI tracking solution',
        priority: 'medium',
        segment: 'mid-market',
        leadScore: 72,
        status: 'contacted',
        followUpDate: new Date(),
        createdAt: new Date(Date.now() - 7200000),
        updatedAt: new Date(Date.now() - 3600000)
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        email: 'sarah@startup.io',
        company: 'Startup Inc',
        phone: '+1987654321',
        urgency: 'exploring',
        currentPain: 'manual-tracking',
        budget: 'under-1k',
        timeline: 'flexible',
        message: 'Researching call tracking options',
        priority: 'low',
        segment: 'small-business',
        leadScore: 45,
        status: 'new',
        followUpDate: new Date(Date.now() + 86400000), // Tomorrow
        createdAt: new Date(Date.now() - 10800000),
        updatedAt: new Date(Date.now() - 10800000)
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !filters.search || 
      lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesPriority = filters.priority === 'all' || lead.priority === filters.priority;
    const matchesUrgency = filters.urgency === 'all' || lead.urgency === filters.urgency;
    const matchesStatus = filters.status === 'all' || lead.status === filters.status;
    const matchesTimeline = filters.timeline === 'all' || lead.timeline === filters.timeline;

    return matchesSearch && matchesPriority && matchesUrgency && matchesStatus && matchesTimeline;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section with Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Management</h1>
        <p className="text-gray-600 mb-6">Manage and track demo requests with intelligent lead scoring</p>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Leads" 
            value={metrics.totalLeads} 
            trend={metrics.trends.total}
            color="blue"
          />
          <MetricCard 
            title="High Priority" 
            value={metrics.highPriorityCount} 
            trend={metrics.trends.highPriority}
            color="red"
          />
          <MetricCard 
            title="Urgent Leads" 
            value={metrics.urgentCount} 
            trend={metrics.trends.urgent}
            color="orange"
          />
          <MetricCard 
            title="Conversion Rate" 
            value={metrics.conversionRate} 
            trend={metrics.trends.conversion}
            color="green"
          />
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-4">
              <FilterDropdown
                label="Priority"
                value={filters.priority}
                onChange={(value) => handleFilterChange('priority', value)}
                options={[
                  { value: 'all', label: 'All Priorities' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' }
                ]}
              />

              <FilterDropdown
                label="Urgency"
                value={filters.urgency}
                onChange={(value) => handleFilterChange('urgency', value)}
                options={[
                  { value: 'all', label: 'All Urgency' },
                  { value: 'urgent', label: 'Urgent' },
                  { value: 'planned', label: 'Planned' },
                  { value: 'exploring', label: 'Exploring' }
                ]}
              />

              <FilterDropdown
                label="Status"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'new', label: 'New' },
                  { value: 'contacted', label: 'Contacted' },
                  { value: 'demo-scheduled', label: 'Demo Scheduled' },
                  { value: 'converted', label: 'Converted' },
                  { value: 'lost', label: 'Lost' }
                ]}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading leads...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pain Point
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Follow-up
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PriorityBadge priority={lead.priority} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <UrgencyBadge urgency={lead.urgency} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <LeadScoreBar score={lead.leadScore} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.currentPain.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.budget.replace(/-/g, ' ').toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <FollowUpDate date={lead.followUpDate} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <ActionButton
                            icon={EyeIcon}
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowDetailsModal(true);
                            }}
                            tooltip="View Details"
                            color="gray"
                          />
                          <ActionButton
                            icon={PhoneIcon}
                            onClick={() => window.open(`tel:${lead.phone}`)}
                            tooltip="Call Lead"
                            color="green"
                          />
                          <ActionButton
                            icon={EnvelopeIcon}
                            onClick={() => window.open(`mailto:${lead.email}`)}
                            tooltip="Send Email"
                            color="blue"
                          />
                          <ActionButton
                            icon={CalendarIcon}
                            onClick={() => console.log('Schedule demo for', lead.id)}
                            tooltip="Schedule Demo"
                            color="purple"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Lead Details Modal */}
      {showDetailsModal && selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
};

// Component: Metric Card
const MetricCard = ({ title, value, trend, color }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    green: 'text-green-600'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
        <div className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      </div>
    </Card>
  );
};

// Component: Filter Dropdown
const FilterDropdown = ({ label, value, onChange, options }) => {
  return (
    <div className="min-w-[150px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Component: Priority Badge
const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

// Component: Urgency Badge
const UrgencyBadge = ({ urgency }) => {
  const styles = {
    urgent: "bg-red-500 text-white animate-pulse",
    planned: "bg-orange-500 text-white",
    exploring: "bg-blue-500 text-white"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[urgency]}`}>
      {urgency.toUpperCase()}
    </span>
  );
};

// Component: Lead Score Progress Bar
const LeadScoreBar = ({ score }) => {
  const color = score >= 80 ? "green" : score >= 60 ? "yellow" : "red";
  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500"
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium">{score}</span>
    </div>
  );
};

// Component: Follow-up Date Indicator
const FollowUpDate = ({ date }) => {
  const isOverdue = new Date(date) < new Date();
  const isToday = new Date(date).toDateString() === new Date().toDateString();

  return (
    <span className={`
      text-xs font-medium
      ${isOverdue ? 'text-red-600 font-bold' : ''}
      ${isToday ? 'text-orange-600 font-bold' : ''}
    `}>
      {isOverdue && <ExclamationTriangleIcon className="w-4 h-4 inline mr-1" />}
      {isToday && <FireIcon className="w-4 h-4 inline mr-1" />}
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
};

// Component: Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    new: "bg-blue-100 text-blue-800 border-blue-200",
    contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
    'demo-scheduled': "bg-purple-100 text-purple-800 border-purple-200",
    converted: "bg-green-100 text-green-800 border-green-200",
    lost: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.replace('-', ' ').toUpperCase()}
    </span>
  );
};

// Component: Action Button
const ActionButton = ({ icon: Icon, onClick, tooltip, color }) => {
  const colorClasses = {
    gray: "text-gray-400 hover:text-gray-600",
    green: "text-green-400 hover:text-green-600",
    blue: "text-blue-400 hover:text-blue-600",
    purple: "text-purple-400 hover:text-purple-600"
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} hover:bg-gray-50 p-1 rounded`}
      title={tooltip}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

// Component: Lead Details Modal
const LeadDetailsModal = ({ lead, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {lead.name}</p>
                  <p><span className="font-medium">Email:</span> {lead.email}</p>
                  <p><span className="font-medium">Company:</span> {lead.company}</p>
                  <p><span className="font-medium">Phone:</span> {lead.phone}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Qualification Data</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Urgency:</span> <UrgencyBadge urgency={lead.urgency} /></p>
                  <p><span className="font-medium">Priority:</span> <PriorityBadge priority={lead.priority} /></p>
                  <p><span className="font-medium">Lead Score:</span> <LeadScoreBar score={lead.leadScore} /></p>
                  <p><span className="font-medium">Budget:</span> {lead.budget}</p>
                  <p><span className="font-medium">Timeline:</span> {lead.timeline}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Pain Point & Message</h4>
              <p className="text-gray-700">{lead.message}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={onClose} className="mt-3 sm:mt-0">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsManagement;