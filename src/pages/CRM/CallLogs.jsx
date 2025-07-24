import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/common';
import { PhoneIcon } from '@heroicons/react/24/outline';

const CallLogs = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Call Logs</h1>
        <p className="text-gray-600 mt-2">View and manage call history with ticket integration</p>
      </motion.div>

      <Card className="p-12 text-center">
        <PhoneIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Logs Coming Soon</h3>
        <p className="text-gray-600">
          Enhanced call log management with ticket creation and linking functionality.
        </p>
      </Card>
    </div>
  );
};

export default CallLogs;