import React from 'react';
import { motion } from 'framer-motion';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { Card } from '../../components/common';

const Organizations = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
        <p className="text-gray-600 mt-2">
          Manage all organizations and their configurations
        </p>
      </motion.div>

      <Card className="p-8 text-center">
        <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizations Management</h3>
        <p className="text-gray-600">
          This page will contain organization management features including:
          <br />• Organization listing with search and filters
          <br />• Organization details and settings
          <br />• User management per organization
          <br />• Billing and subscription management
        </p>
      </Card>
    </div>
  );
};

export default Organizations;