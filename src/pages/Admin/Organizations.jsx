import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  CreditCardIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Input, Modal } from '../../components/common';
import { organizationService } from '../../services/organizationService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      
      if (user?.role === 'super_admin') {
        // Super admin can see all organizations
        response = await organizationService.getAllOrganizations();
      } else if (user?.organizationId) {
        // Regular admin sees only their organization
        const orgResponse = await organizationService.getOrganization(user.organizationId);
        response = { data: [orgResponse.data] };
      } else {
        setOrganizations([]);
        setLoading(false);
        return;
      }

      // Transform backend organization data to match frontend structure
      const transformedOrgs = response?.data?.map(backendOrg => ({
        id: backendOrg._id || backendOrg.id,
        name: backendOrg.name,
        domain: backendOrg.domain || `${backendOrg.name.toLowerCase()}.com`,
        status: backendOrg.isActive ? 'active' : 'suspended',
        plan: backendOrg.plan || 'basic',
        users: backendOrg.userCount || 0,
        billing: {
          amount: backendOrg.billing?.amount || 0,
          period: backendOrg.billing?.period || 'month'
        },
        createdAt: new Date(backendOrg.createdAt).toLocaleDateString(),
        lastActive: backendOrg.lastActivityAt ? new Date(backendOrg.lastActivityAt).toLocaleDateString() : 'Never',
        settings: backendOrg.settings || {}
      })) || [];

      setOrganizations(transformedOrgs);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast.error('Failed to load organizations');
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const refreshOrganizations = async () => {
    await fetchOrganizations();
  };

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user, fetchOrganizations]);

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (org.domain && org.domain.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    const matchesPlan = planFilter === 'all' || org.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleModal = (type, org = null) => {
    setModalType(type);
    setSelectedOrg(org);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const planColors = {
      basic: 'bg-gray-100 text-gray-800',
      professional: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${planColors[plan]}`}>
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </span>
    );
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
            <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
            <p className="text-gray-600 mt-2">
              Manage all organizations and their configurations
            </p>
          </div>
          <Button
            onClick={() => handleModal('create')}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Organization</span>
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search organizations..."
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
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Organizations List */}
      {loading ? (
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading organizations...</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredOrganizations.map((org) => (
            <Card key={org.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-gray-600">{org.domain}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {getStatusBadge(org.status)}
                  {getPlanBadge(org.plan)}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <UsersIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{org.users}</span>
                  </div>
                  <p className="text-sm text-gray-600">Users</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCardIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">
                      ${org.billing.amount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{org.billing.period}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-sm font-semibold text-gray-900">{org.createdAt}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="text-sm font-semibold text-gray-900">{org.lastActive}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('view', org)}
                  className="flex items-center space-x-1"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('users', org)}
                  className="flex items-center space-x-1"
                >
                  <UsersIcon className="w-4 h-4" />
                  <span>Users</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('billing', org)}
                  className="flex items-center space-x-1"
                >
                  <CreditCardIcon className="w-4 h-4" />
                  <span>Billing</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('settings', org)}
                  className="flex items-center space-x-1"
                >
                  <Cog6ToothIcon className="w-4 h-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModal('edit', org)}
                  className="flex items-center space-x-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleModal('delete', org)}
                  className="flex items-center space-x-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </Card>
          ))}
          
          {filteredOrganizations.length === 0 && (
            <Card className="p-8 text-center">
              <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms or filters.' : 'Get started by adding your first organization.'}
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
          modalType === 'create' ? 'Add New Organization' :
          modalType === 'edit' ? 'Edit Organization' :
          modalType === 'view' ? 'Organization Details' :
          modalType === 'users' ? 'User Management' :
          modalType === 'billing' ? 'Billing & Subscription' :
          modalType === 'settings' ? 'Organization Settings' :
          modalType === 'delete' ? 'Delete Organization' : ''
        }
        size={modalType === 'users' || modalType === 'billing' ? 'xl' : 'lg'}
      >
        <ModalContent 
          modalType={modalType} 
          organization={selectedOrg} 
          onClose={() => setIsModalOpen(false)}
          onSuccess={refreshOrganizations}
        />
      </Modal>
    </div>
  );
};

// Modal Content Component
const ModalContent = ({ modalType, organization, onClose, onSuccess }) => {
  switch (modalType) {
    case 'create':
    case 'edit':
      return <OrganizationForm organization={organization} isEdit={modalType === 'edit'} onClose={onClose} onSuccess={onSuccess} />;
    case 'view':
      return <OrganizationDetails organization={organization} />;
    case 'users':
      return <UserManagement organization={organization} />;
    case 'billing':
      return <BillingManagement organization={organization} />;
    case 'settings':
      return <OrganizationSettings organization={organization} />;
    case 'delete':
      return <DeleteConfirmation organization={organization} onClose={onClose} onSuccess={onSuccess} />;
    default:
      return null;
  }
};

// Organization Form Component
const OrganizationForm = ({ organization, isEdit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: organization?.name || '',
    domain: organization?.domain || '',
    plan: organization?.plan || 'basic',
    status: organization?.status || 'active',
    description: organization?.description || '',
    address: organization?.address || '',
    phone: organization?.phone || '',
    website: organization?.website || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (!formData.domain.trim()) {
      newErrors.domain = 'Domain is required';
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      newErrors.domain = 'Please enter a valid domain (e.g., company.com)';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    
    try {
      const orgData = {
        name: formData.name.trim(),
        domain: formData.domain.trim(),
        plan: formData.plan,
        isActive: formData.status === 'active',
        description: formData.description.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        settings: {
          notifications: true,
          analytics: true,
          api: false
        }
      };

      if (isEdit) {
        await organizationService.updateOrganization(organization.id, orgData);
        toast.success('Organization updated successfully');
      } else {
        await organizationService.createOrganization(orgData);
        toast.success('Organization created successfully! You can now create users for this organization.');
      }
      
      onSuccess(); // Refresh the organizations list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error saving organization:', error);
      toast.error(error.response?.data?.message || error.message || `Failed to ${isEdit ? 'update' : 'create'} organization`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Organization Name *"
          placeholder="Enter organization name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
        <Input
          label="Domain *"
          placeholder="company.com"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          error={errors.domain}
          required
        />
      </div>

      <Input
        label="Description"
        placeholder="Brief description of the organization"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          label="Website"
          placeholder="https://company.com"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          error={errors.website}
        />
      </div>

      <Input
        label="Address"
        placeholder="Company address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
          <select
            value={formData.plan}
            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
            className="input-field"
          >
            <option value="basic">Basic - Up to 10 users</option>
            <option value="professional">Professional - Up to 50 users</option>
            <option value="enterprise">Enterprise - Unlimited users</option>
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
      </div>

      <Modal.Footer>
        <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} disabled={loading}>
          {loading ? 'Saving...' : (isEdit ? 'Update Organization' : 'Create Organization')}
        </Button>
      </Modal.Footer>
    </form>
  );
};

// Organization Details Component
const OrganizationDetails = ({ organization }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-500">Name</label>
        <p className="text-lg font-semibold text-gray-900">{organization?.name}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Domain</label>
        <p className="text-lg font-semibold text-gray-900">{organization?.domain}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Plan</label>
        <p className="text-lg font-semibold text-gray-900 capitalize">{organization?.plan}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Status</label>
        <p className="text-lg font-semibold text-gray-900 capitalize">{organization?.status}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Users</label>
        <p className="text-lg font-semibold text-gray-900">{organization?.users}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Created At</label>
        <p className="text-lg font-semibold text-gray-900">{organization?.createdAt}</p>
      </div>
    </div>
  </div>
);

// User Management Component
const UserManagement = ({ organization }) => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'manager', status: 'pending' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Users in {organization?.name}</h4>
        <Button size="sm">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      <div className="space-y-3">
        {mockUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 capitalize">{user.role}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status}
              </span>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Billing Management Component
const BillingManagement = ({ organization }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Current Subscription</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Plan</label>
          <p className="text-lg font-semibold text-gray-900 capitalize">{organization?.plan}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Billing Amount</label>
          <p className="text-lg font-semibold text-gray-900">
            ${organization?.billing.amount}/{organization?.billing.period}
          </p>
        </div>
      </div>
    </div>
    
    <div className="space-y-3">
      <h4 className="text-lg font-semibold">Billing History</h4>
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-medium">Invoice #{1000 + i}</p>
              <p className="text-sm text-gray-600">July {i}, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${organization?.billing.amount}</p>
              <p className="text-sm text-green-600">Paid</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <Modal.Footer>
      <Button variant="ghost">Download Invoice</Button>
      <Button>Update Payment Method</Button>
    </Modal.Footer>
  </div>
);

// Organization Settings Component
const OrganizationSettings = ({ organization }) => {
  const [settings, setSettings] = useState(organization?.settings || {});

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-600">Receive email updates and alerts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            className="h-4 w-4 text-primary-600 rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Analytics Tracking</h4>
            <p className="text-sm text-gray-600">Enable detailed usage analytics</p>
          </div>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
            className="h-4 w-4 text-primary-600 rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">API Access</h4>
            <p className="text-sm text-gray-600">Allow API integration access</p>
          </div>
          <input
            type="checkbox"
            checked={settings.api}
            onChange={(e) => setSettings({ ...settings, api: e.target.checked })}
            className="h-4 w-4 text-primary-600 rounded"
          />
        </div>
      </div>
      
      <Modal.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Save Settings</Button>
      </Modal.Footer>
    </div>
  );
};

// Delete Confirmation Component
const DeleteConfirmation = ({ organization, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await organizationService.deleteOrganization(organization.id);
      toast.success('Organization deleted successfully');
      onSuccess(); // Refresh the organizations list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error deleting organization:', error);
      toast.error(error.message || 'Failed to delete organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <TrashIcon className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900">Delete Organization</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete <strong>{organization?.name}</strong>? 
              This action cannot be undone and will permanently remove all associated data including users, tickets, and call logs.
            </p>
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete} 
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Organization'}
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default Organizations;