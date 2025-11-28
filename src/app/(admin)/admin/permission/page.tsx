'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePermissions } from '@/hooks/usePermissions';

export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { permissions, loading, error, deletePermission } = usePermissions();

  const handleDelete = async (permissionId: string, permissionName: string) => {
    if (confirm(`Are you sure you want to delete ${permissionName}?`)) {
      try {
        await deletePermission(permissionId);
        alert('Permission deleted successfully!');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete permission');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading permissions...</div>
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
            Permission Management ({permissions.length})
          </h1>
          <p className="text-gray-600">Manage system permissions and role assignments</p>
        </div>
        <Link href="/admin/permission/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Permission</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Permissions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-green-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Permission Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Permission Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assigned Roles</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissions.map((permission, index) => (
                <motion.tr
                  key={permission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{permission.permissionName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {permission.permissionCode}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {permission.roles && permission.roles.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {permission.roles.map((roleAssignment) => (
                          <span 
                            key={roleAssignment.id}
                            className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium"
                          >
                            {roleAssignment.role.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No roles assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/permission/${permission.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(permission.id, permission.permissionName)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {permissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No permissions found</p>
              <Link href="/admin/permission/new">
                <button className="text-green-700 hover:text-green-800 font-medium">
                  Create your first permission
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
