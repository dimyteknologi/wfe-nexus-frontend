"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PermissionFormData } from "@/lib/types/admin.types";
import Button from "@/components/atoms/Button";
import { ShieldCheck, ArrowLeft, Code } from "lucide-react";

interface PermissionFormProps {
  initialData?: PermissionFormData;
  isEdit?: boolean;
  onSubmit: (data: PermissionFormData) => void;
}

const defaultFormData: PermissionFormData = {
  permissionName: "",
  permissionCode: "",
};

export function PermissionForm({ initialData = defaultFormData, isEdit = false, onSubmit }: PermissionFormProps) {
  const [formData, setFormData] = useState<PermissionFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof PermissionFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof PermissionFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PermissionFormData, string>> = {};

    if (!formData.permissionName?.trim()) {
      newErrors.permissionName = "Permission Name is required";
    }

    if (!formData.permissionCode?.trim()) {
      newErrors.permissionCode = "Permission Code is required";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? "Edit Permission" : "Add New Permission"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update permission information" : "Create a new permission"}
          </p>
        </div>
        <Link
          href="/admin/permission"
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors group"
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
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        {/* Section Header */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
            </div>
            Permission Information
          </h3>
          <p className="text-sm text-gray-500 mt-2 ml-13">
            Define permission name and unique code
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Permission Name <span className="text-red-500">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              name="permissionName"
              value={formData.permissionName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.permissionName 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="e.g., Manage Products"
            />
            {errors.permissionName && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center"
              >
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.permissionName}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              Permission Code <span className="text-red-500 ml-1">*</span>
              <Code className="w-4 h-4 ml-2 text-gray-400" />
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              name="permissionCode"
              value={formData.permissionCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all font-mono text-sm ${
                errors.permissionCode 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="e.g., manage:products"
            />
            {errors.permissionCode && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center"
              >
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.permissionCode}
              </motion.p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Use colon notation (e.g., resource:action)
            </p>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-end space-x-4 pt-8 mt-8 border-t border-gray-200"
        >
          <Link href="/admin/permission">
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
            {isEdit ? "Update Permission" : "Create Permission"}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
