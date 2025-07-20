import React from 'react';
import { motion } from 'framer-motion';
import { CogIcon } from '@heroicons/react/24/outline';
import { Card } from '../../components/common';

const Settings = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure platform-wide settings and preferences
        </p>
      </motion.div>

      <Card className="p-8 text-center">
        <CogIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">System Configuration</h3>
        <p className="text-gray-600">
          This page will contain settings including:
          <br />• Platform configuration and feature flags
          <br />• System monitoring and maintenance tools
          <br />• Security settings and compliance
          <br />• Backup and data retention policies
        </p>
      </Card>
    </div>
  );
};

export default Settings;