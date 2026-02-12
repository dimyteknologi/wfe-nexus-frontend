"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Role } from "@/lib/types/admin.types";
import { usePermissions } from "@/hooks/usePermissions";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { UserCog, ArrowLeft, Key } from "lucide-react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

interface RoleFormProps {
  initialData?: Partial<Role>;
  isEdit?: boolean;
  onSubmit: (data: Partial<Role>) => void;
}

const defaultFormData: Partial<Role> = {
  name: "",
  description: "",
  permissions: [],
  permissionIds: [],
  status: "Active",
};

export function RoleForm({ initialData = defaultFormData, isEdit = false, onSubmit }: RoleFormProps) {
  const [formData, setFormData] = useState<Partial<Role>>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof Role, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { permissions, loading: permissionsLoading } = usePermissions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof Role]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => {
      const currentPermissionIds = prev.permissionIds || [];
      const isSelected = currentPermissionIds.includes(permissionId);
      
      return {
        ...prev,
        permissionIds: isSelected
          ? currentPermissionIds.filter(id => id !== permissionId)
          : [...currentPermissionIds, permissionId]
      };
    });
  };

  const selectAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissionIds: permissions.map(p => p.id)
    }));
  };

  const deselectAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissionIds: []
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Role, string>> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Role Name is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const selectedCount = formData.permissionIds?.length || 0;
  const totalCount = permissions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? "Edit Role" : "Add New Role"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update role information and permissions" : "Create a new role with permissions"}
          </p>
        </div>
        <Link
          href="/admin/role"
          className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Form Card */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8"
      >
        {/* Role Information Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
              <UserCog className="w-5 h-5 text-amber-600" />
            </div>
            Role Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role Name <span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  errors.name 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                    : "border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
                placeholder="Enter role name"
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <motion.select
                whileFocus={{ scale: 1.01 }}
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </motion.select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  errors.description 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                    : "border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
                placeholder="Enter role description"
              />
              {errors.description && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.description}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Permissions Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <Key className="w-5 h-5 text-purple-600" />
              </div>
              Assign Permissions
              <Badge variant="success" className="ml-3">
                {selectedCount} / {totalCount} selected
              </Badge>
            </h3>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={selectAllPermissions}
                disabled={permissionsLoading}
              >
                Select All
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={deselectAllPermissions}
                disabled={permissionsLoading || selectedCount === 0}
              >
                Clear All
              </Button>
            </div>
          </div>
          
          {permissionsLoading ? (
            <div className="flex items-center justify-center py-12 bg-gray-50 rounded-xl">
              <LoadingSpinner size="lg" />
              <span className="ml-3 text-gray-600">Loading permissions...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {permissions.map((permission) => {
                const isSelected = formData.permissionIds?.includes(permission.id) || false;
                return (
                  <motion.label
                    key={permission.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "border-purple-500 bg-purple-50 shadow-sm"
                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {permission.permissionName}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        {permission.permissionCode}
                      </div>
                    </div>
                  </motion.label>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
        >
          <Link href="/admin/role">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            loading={isSubmitting}
          >
            {isEdit ? "Update Role" : "Create Role"}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
