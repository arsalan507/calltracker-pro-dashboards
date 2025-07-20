import React from 'react';
import { motion } from 'framer-motion';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Card } from '../../components/common';

const Users = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">
          Manage all users across the platform
        </p>
      </motion.div>

      <Card className="p-8 text-center">
        <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
        <p className="text-gray-600">
          This page will contain user management features including:
          <br />• Global user search and filtering
          <br />• User activity monitoring
          <br />• Role and permission management
          <br />• User analytics and behavior tracking
        </p>
      </Card>
    </div>
  );
};

export default Users;