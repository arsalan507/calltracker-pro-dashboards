import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../../components/common';
import { ticketService } from '../../services/ticketService';
import { callLogService } from '../../services/callLogService';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';
import {
  TicketIcon,
  PhoneIcon,
  BellIcon,
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { 
    user, 
    getUserRole, 
    canViewAllTickets, 
    canViewAnalytics,
    isSuperAdmin,
    isOrgAdmin,
    isManager
  } = useAuth();
  
  const [dashboardData, setDashboardData] = useState({
    tickets: { total: 0, open: 0, overdue: 0, resolved: 0 },
    calls: { today: 0, total: 0, withTickets: 0 },
    notifications: { unread: 0 },
    recentTickets: [],
    recentCalls: [],
    loading: true
  });

  const userRole = getUserRole();

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true }));

      // Fetch data based on user role
      const promises = [];

      // Ticket statistics
      if (canViewAllTickets()) {
        promises.push(ticketService.getTicketStats());
      } else {
        promises.push(ticketService.getMyTickets({ limit: 10 }));
      }

      // Call logs
      promises.push(callLogService.getCallLogs({ limit: 10 }));

      // Notifications
      promises.push(notificationService.getUnreadCount());

      const [ticketsResponse, callsResponse, notificationsResponse] = await Promise.all(promises);

      // Process ticket data
      let ticketStats = { total: 0, open: 0, overdue: 0, resolved: 0 };
      let recentTickets = [];

      if (canViewAllTickets() && ticketsResponse.stats) {
        ticketStats = ticketsResponse.stats;
        recentTickets = ticketsResponse.recentTickets || [];
      } else if (ticketsResponse.data) {
        const tickets = ticketsResponse.data;
        recentTickets = tickets.slice(0, 5);
        ticketStats = {
          total: tickets.length,
          open: tickets.filter(t => t.status === 'open').length,
          overdue: tickets.filter(t => t.isOverdue).length,
          resolved: tickets.filter(t => t.status === 'resolved').length
        };
      }

      // Process call data
      const calls = callsResponse.data || [];
      const today = new Date().toDateString();
      const callsToday = calls.filter(call => 
        new Date(call.createdAt).toDateString() === today
      ).length;

      setDashboardData({
        tickets: ticketStats,
        calls: {
          today: callsToday,
          total: calls.length,
          withTickets: calls.filter(call => call.ticketId).length
        },
        notifications: {
          unread: notificationsResponse.count || 0
        },
        recentTickets,
        recentCalls: calls.slice(0, 5),
        loading: false
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.fullName || user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              {getRoleDisplayName(userRole)} • {getGreeting()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {canViewAllTickets() && (
              <Link to="/dashboard/crm/tickets/new">
                <Button className="flex items-center space-x-2">
                  <TicketIcon className="w-5 h-5" />
                  <span>New Ticket</span>
                </Button>
              </Link>
            )}
            <Link to="/dashboard/notifications">
              <Button variant="ghost" className="relative">
                <BellIcon className="w-5 h-5" />
                {dashboardData.notifications.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {dashboardData.notifications.unread}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatsCard
            title="Total Tickets"
            value={dashboardData.tickets.total}
            icon={TicketIcon}
            color="primary"
            change={canViewAnalytics() ? "+12%" : null}
            trend="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatsCard
            title="Open Tickets"
            value={dashboardData.tickets.open}
            icon={ExclamationTriangleIcon}
            color="warning"
            change={canViewAnalytics() ? "-5%" : null}
            trend="down"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatsCard
            title="Calls Today"
            value={dashboardData.calls.today}
            icon={PhoneIcon}
            color="secondary"
            change={canViewAnalytics() ? "+8%" : null}
            trend="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StatsCard
            title="Resolved"
            value={dashboardData.tickets.resolved}
            icon={CheckCircleIcon}
            color="success"
            change={canViewAnalytics() ? "+15%" : null}
            trend="up"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
              <Link to="/dashboard/crm/tickets" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData.recentTickets.length > 0 ? (
                dashboardData.recentTickets.map((ticket) => (
                  <TicketItem key={ticket.id || ticket._id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TicketIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No tickets found</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Recent Calls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
              <Link to="/dashboard/crm/calls" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData.recentCalls.length > 0 ? (
                dashboardData.recentCalls.map((call) => (
                  <CallItem key={call.id || call._id} call={call} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PhoneIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No calls found</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions for Different Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getQuickActions(userRole).map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// Helper Components
const StatsCard = ({ title, value, icon: Icon, color, change, trend }) => {
  const colorClasses = {
    primary: 'bg-primary-gradient text-white',
    secondary: 'bg-secondary-gradient text-white',
    success: 'bg-green-gradient text-white',
    warning: 'bg-yellow-gradient text-white',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                )}
                {change}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const TicketItem = ({ ticket }) => (
  <Link to={`/dashboard/crm/tickets/${ticket.id || ticket._id}`} className="block">
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-3 h-3 rounded-full ${getStatusColor(ticket.status)}`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{ticket.title}</p>
        <p className="text-sm text-gray-500">{ticket.customerName || ticket.customer?.name}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</p>
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityClass(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </div>
    </div>
  </Link>
);

const CallItem = ({ call }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className={`w-3 h-3 rounded-full ${call.type === 'incoming' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{call.customerName || call.phoneNumber}</p>
      <p className="text-sm text-gray-500">{call.duration} • {call.type}</p>
    </div>
    <div className="text-right">
      <p className="text-xs text-gray-500">{formatDate(call.createdAt)}</p>
      {call.ticketId && (
        <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
          Ticket Created
        </span>
      )}
    </div>
  </div>
);

const QuickActionButton = ({ title, icon: Icon, path, color = 'primary' }) => (
  <Link to={path}>
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-center">
        <Icon className={`w-8 h-8 mx-auto mb-2 text-${color}-600`} />
        <p className="text-sm font-medium text-gray-900">{title}</p>
      </div>
    </Card>
  </Link>
);

// Helper Functions
const getRoleDisplayName = (role) => {
  const roleNames = {
    super_admin: 'Super Administrator',
    org_admin: 'Organization Administrator',
    manager: 'Manager',
    agent: 'Agent',
    viewer: 'Viewer'
  };
  return roleNames[role] || 'User';
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const getStatusColor = (status) => {
  const colors = {
    open: 'bg-yellow-500',
    'in-progress': 'bg-blue-500',
    resolved: 'bg-green-500',
    closed: 'bg-gray-500'
  };
  return colors[status] || 'bg-gray-500';
};

const getPriorityClass = (priority) => {
  const classes = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };
  return classes[priority] || 'bg-gray-100 text-gray-800';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const getQuickActions = (userRole) => {
  const baseActions = [
    { title: 'View Calls', icon: PhoneIcon, path: '/dashboard/crm/calls' },
    { title: 'Notifications', icon: BellIcon, path: '/dashboard/notifications' },
  ];

  const roleSpecificActions = {
    super_admin: [
      { title: 'All Tickets', icon: TicketIcon, path: '/dashboard/crm/tickets' },
      { title: 'Analytics', icon: ChartBarIcon, path: '/dashboard/crm/analytics' },
      { title: 'Users', icon: UsersIcon, path: '/dashboard/admin/users' },
      { title: 'Organizations', icon: UsersIcon, path: '/dashboard/admin/organizations' },
    ],
    org_admin: [
      { title: 'All Tickets', icon: TicketIcon, path: '/dashboard/crm/tickets' },
      { title: 'Analytics', icon: ChartBarIcon, path: '/dashboard/crm/analytics' },
      { title: 'Team', icon: UsersIcon, path: '/dashboard/admin/users' },
    ],
    manager: [
      { title: 'Team Tickets', icon: TicketIcon, path: '/dashboard/crm/tickets' },
      { title: 'Analytics', icon: ChartBarIcon, path: '/dashboard/crm/analytics' },
    ],
    agent: [
      { title: 'My Tickets', icon: TicketIcon, path: '/dashboard/crm/tickets' },
      { title: 'New Ticket', icon: TicketIcon, path: '/dashboard/crm/tickets/new' },
    ],
    viewer: [
      { title: 'Tickets', icon: TicketIcon, path: '/dashboard/crm/tickets' },
    ]
  };

  return [...baseActions, ...(roleSpecificActions[userRole] || [])];
};

export default Dashboard;