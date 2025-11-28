'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useOrganizations } from '@/hooks/useOrganizations';

export default function OrganizationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { organizations, loading, error, deleteOrganization } = useOrganizations();

  const handleDelete = async (orgId: string, orgName: string) => {
    if (confirm(`Are you sure you want to delete ${orgName}?`)) {
      try {
        await deleteOrganization(orgId);
        alert('Organization deleted successfully!');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete organization');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading organizations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-green-800 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Organization Management ({organizations.length})
          </h1>
          <p className="text-gray-600">Manage organizations and their information</p>
        </div>
        <Link href="/admin/organization/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            Add New Organization
          </motion.button>
        </Link>
      </motion.div>

      {/* Organizations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Organization</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organizations.map((org, index) => (
                <motion.tr
                  key={org.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">
                          {org.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{org.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link href={`/admin/organization/${org.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(org.id, org.name)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
