import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Input, Modal } from '../../components/common';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [organizationFilter, setOrganizationFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@acme.com',
        phone: '+1 (555) 123-4567',
        avatar: null,
        status: 'active',
        role: 'admin',
        organization: 'Acme Corporation',
        organizationId: 1,
        joinedAt: '2024-01-15',
        lastActive: '2024-07-23 10:30',
        loginCount: 245,
        permissions: ['users.read', 'users.write', 'organizations.read', 'organizations.write', 'analytics.read'],
        activity: {
          sessionsToday: 3,
          avgSessionTime: '2h 15m',
          totalCalls: 1250,
          lastLogin: '2024-07-23 10:30'
        },
        analytics: {
          callsThisMonth: 89,
          successRate: 78,
          avgCallDuration: '8m 45s',
          conversionRate: 15.2
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@techstart.io',
        phone: '+1 (555) 234-5678',
        avatar: null,
        status: 'active',
        role: 'manager',
        organization: 'TechStart Inc',
        organizationId: 2,
        joinedAt: '2024-02-20',
        lastActive: '2024-07-22 16:45',
        loginCount: 156,
        permissions: ['users.read', 'organizations.read', 'analytics.read'],
        activity: {
          sessionsToday: 2,
          avgSessionTime: '1h 45m',
          totalCalls: 875,
          lastLogin: '2024-07-22 16:45'
        },
        analytics: {
          callsThisMonth: 67,
          successRate: 82,
          avgCallDuration: '7m 30s',
          conversionRate: 18.5
        }
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@globalsol.com',
        phone: '+1 (555) 345-6789',
        avatar: null,
        status: 'suspended',
        role: 'user',
        organization: 'Global Solutions',
        organizationId: 3,
        joinedAt: '2024-03-10',
        lastActive: '2024-07-18 14:20',
        loginCount: 89,
        permissions: ['analytics.read'],
        activity: {
          sessionsToday: 0,
          avgSessionTime: '45m',
          totalCalls: 320,
          lastLogin: '2024-07-18 14:20'
        },
        analytics: {
          callsThisMonth: 12,
          successRate: 65,
          avgCallDuration: '6m 15s',
          conversionRate: 8.7
        }
      },
      {
        id: 4,
        name: 'Alice Wilson',
        email: 'alice.wilson@acme.com',
        phone: '+1 (555) 456-7890',
        avatar: null,
        status: 'pending',
        role: 'user',
        organization: 'Acme Corporation',
        organizationId: 1,
        joinedAt: '2024-07-20',
        lastActive: null,
        loginCount: 0,
        permissions: [],
        activity: {
          sessionsToday: 0,
          avgSessionTime: '0m',
          totalCalls: 0,
          lastLogin: null
        },
        analytics: {
          callsThisMonth: 0,
          successRate: 0,
          avgCallDuration: '0m',
          conversionRate: 0
        }
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const organizations = ['Acme Corporation', 'TechStart Inc', 'Global Solutions'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesOrg = organizationFilter === 'all' || user.organization === organizationFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesOrg;
  });

  const handleModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      suspended: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ExclamationTriangleIcon }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getActivityStatus = (lastActive) => {
    if (!lastActive) return 'Never';
    const now = new Date();
    const lastActiveDate = new Date(lastActive);
    const diffHours = Math.floor((now - lastActiveDate) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Online';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">
              Manage all users across the platform
            </p>
          </div>
          <Button
            onClick={() => handleModal('create')}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add User</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary-gradient rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Online Now</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => getActivityStatus(u.lastActive) === 'Online').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search users by name, email, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={MagnifyingGlassIcon}
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <select
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Organizations</option>
              {organizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Users List */}
      {loading ? (
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        {user.email}
                      </span>
                      <span className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        {user.phone}
                      </span>
                      <span className="flex items-center">
                        <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                        {user.organization}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(user.status)}
                  {getRoleBadge(user.role)}
                  <span className="text-sm text-gray-500">
                    {getActivityStatus(user.lastActive)}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-gray-900">{user.loginCount}</span>
                  </div>
                  <p className="text-xs text-gray-600">Total Logins</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-gray-900">{user.activity.sessionsToday}</span>
                  </div>
                  <p className="text-xs text-gray-600">Sessions Today</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <ChartBarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-gray-900">{user.analytics.callsThisMonth}</span>
                  </div>
                  <p className="text-xs text-gray-600">Calls This Month</p>
                </div>
                
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900">{user.analytics.successRate}%</span>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
                
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900">{user.analytics.conversionRate}%</span>
                  <p className="text-xs text-gray-600">Conversion Rate</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('view', user)}
                  className="flex items-center space-x-1"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('activity', user)}
                  className="flex items-center space-x-1"
                >
                  <ClockIcon className="w-4 h-4" />
                  <span>Activity</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('permissions', user)}
                  className="flex items-center space-x-1"
                >
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Permissions</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('analytics', user)}
                  className="flex items-center space-x-1"
                >
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Analytics</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('edit', user)}
                  className="flex items-center space-x-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleModal('delete', user)}
                  className="flex items-center space-x-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </Card>
          ))}
          
          {filteredUsers.length === 0 && (
            <Card className="p-8 text-center">
              <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms or filters.' : 'Get started by adding your first user.'}
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Modal for different actions */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'create' ? 'Add New User' :
          modalType === 'edit' ? 'Edit User' :
          modalType === 'view' ? 'User Details' :
          modalType === 'activity' ? 'User Activity' :
          modalType === 'permissions' ? 'Role & Permissions' :
          modalType === 'analytics' ? 'User Analytics' :
          modalType === 'delete' ? 'Delete User' : ''
        }
        size={modalType === 'analytics' || modalType === 'activity' ? 'xl' : 'lg'}
      >
        <ModalContent modalType={modalType} user={selectedUser} />
      </Modal>
    </div>
  );
};

// Modal Content Component
const ModalContent = ({ modalType, user }) => {
  switch (modalType) {
    case 'create':
    case 'edit':
      return <UserForm user={user} isEdit={modalType === 'edit'} />;
    case 'view':
      return <UserDetails user={user} />;
    case 'activity':
      return <UserActivity user={user} />;
    case 'permissions':
      return <UserPermissions user={user} />;
    case 'analytics':
      return <UserAnalytics user={user} />;
    case 'delete':
      return <DeleteConfirmation user={user} />;
    default:
      return null;
  }
};

// User Form Component
const UserForm = ({ user, isEdit }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'user',
    status: user?.status || 'active',
    organization: user?.organization || ''
  });

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="input-field"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="input-field"
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Input
        label="Organization"
        value={formData.organization}
        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
        required
      />
      <Modal.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>{isEdit ? 'Update' : 'Create'} User</Button>
      </Modal.Footer>
    </div>
  );
};

// User Details Component
const UserDetails = ({ user }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center">
        <UserCircleIcon className="w-12 h-12 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-500">Joined {user?.joinedAt}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-500">Phone</label>
        <p className="text-lg font-semibold text-gray-900">{user?.phone}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Organization</label>
        <p className="text-lg font-semibold text-gray-900">{user?.organization}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Role</label>
        <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Status</label>
        <p className="text-lg font-semibold text-gray-900 capitalize">{user?.status}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Total Logins</label>
        <p className="text-lg font-semibold text-gray-900">{user?.loginCount}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Last Active</label>
        <p className="text-lg font-semibold text-gray-900">{user?.lastActive || 'Never'}</p>
      </div>
    </div>
  </div>
);

// User Activity Component
const UserActivity = ({ user }) => {
  const mockSessions = [
    { id: 1, start: '2024-07-23 09:00', end: '2024-07-23 12:30', duration: '3h 30m', ip: '192.168.1.1' },
    { id: 2, start: '2024-07-23 13:00', end: '2024-07-23 17:00', duration: '4h 0m', ip: '192.168.1.1' },
    { id: 3, start: '2024-07-22 08:30', end: '2024-07-22 16:45', duration: '8h 15m', ip: '192.168.1.2' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{user?.activity.sessionsToday}</p>
          <p className="text-sm text-gray-600">Sessions Today</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{user?.activity.avgSessionTime}</p>
          <p className="text-sm text-gray-600">Avg Session Time</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{user?.activity.totalCalls}</p>
          <p className="text-sm text-gray-600">Total Calls</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{user?.loginCount}</p>
          <p className="text-sm text-gray-600">Total Logins</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4">Recent Sessions</h4>
        <div className="space-y-3">
          {mockSessions.map(session => (
            <div key={session.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{session.start} - {session.end}</p>
                <p className="text-sm text-gray-600">IP: {session.ip}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{session.duration}</p>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// User Permissions Component
const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user?.permissions || []);
  
  const availablePermissions = [
    { id: 'users.read', name: 'View Users', description: 'Can view user information' },
    { id: 'users.write', name: 'Manage Users', description: 'Can create, edit, and delete users' },
    { id: 'organizations.read', name: 'View Organizations', description: 'Can view organization information' },
    { id: 'organizations.write', name: 'Manage Organizations', description: 'Can create, edit, and delete organizations' },
    { id: 'analytics.read', name: 'View Analytics', description: 'Can access analytics and reports' },
    { id: 'billing.read', name: 'View Billing', description: 'Can view billing information' },
    { id: 'billing.write', name: 'Manage Billing', description: 'Can manage billing and subscriptions' }
  ];

  const togglePermission = (permissionId) => {
    setPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2">Current Role: {user?.role}</h4>
        <p className="text-gray-600">Manage specific permissions for this user</p>
      </div>
      
      <div className="space-y-3">
        {availablePermissions.map(permission => (
          <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h5 className="font-medium">{permission.name}</h5>
              <p className="text-sm text-gray-600">{permission.description}</p>
            </div>
            <input
              type="checkbox"
              checked={permissions.includes(permission.id)}
              onChange={() => togglePermission(permission.id)}
              className="h-4 w-4 text-primary-600 rounded"
            />
          </div>
        ))}
      </div>
      
      <Modal.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Save Permissions</Button>
      </Modal.Footer>
    </div>
  );
};

// User Analytics Component
const UserAnalytics = ({ user }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-2xl font-bold text-blue-900">{user?.analytics.callsThisMonth}</p>
        <p className="text-sm text-blue-600">Calls This Month</p>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-2xl font-bold text-green-900">{user?.analytics.successRate}%</p>
        <p className="text-sm text-green-600">Success Rate</p>
      </div>
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <p className="text-2xl font-bold text-purple-900">{user?.analytics.avgCallDuration}</p>
        <p className="text-sm text-purple-600">Avg Call Duration</p>
      </div>
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <p className="text-2xl font-bold text-orange-900">{user?.analytics.conversionRate}%</p>
        <p className="text-sm text-orange-600">Conversion Rate</p>
      </div>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Performance Trends</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Calls vs Last Month</span>
          <span className="text-green-600 font-medium">+12%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Success Rate vs Last Month</span>
          <span className="text-green-600 font-medium">+5%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Conversion Rate vs Last Month</span>
          <span className="text-red-600 font-medium">-2%</span>
        </div>
      </div>
    </div>
    
    <div>
      <h4 className="text-lg font-semibold mb-4">Behavior Insights</h4>
      <div className="space-y-2">
        <p className="text-sm">• Most active during morning hours (9 AM - 12 PM)</p>
        <p className="text-sm">• Prefers shorter call durations with higher frequency</p>
        <p className="text-sm">• Shows consistent performance week over week</p>
        <p className="text-sm">• High engagement with new prospects</p>
      </div>
    </div>
  </div>
);

// Delete Confirmation Component
const DeleteConfirmation = ({ user }) => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
        <TrashIcon className="h-6 w-6 text-red-600" />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete <strong>{user?.name}</strong>? 
            This action cannot be undone and will permanently remove all associated data.
          </p>
        </div>
      </div>
    </div>
    <Modal.Footer>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete User</Button>
    </Modal.Footer>
  </div>
);

export default Users;