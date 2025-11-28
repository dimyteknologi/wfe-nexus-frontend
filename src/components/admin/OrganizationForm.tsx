"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Organization } from "@/lib/types/admin.types";

interface OrganizationFormProps {
  initialData?: Partial<Organization>;
  isEdit?: boolean;
  onSubmit: (data: Partial<Organization>) => void;
}

const defaultFormData: Partial<Organization> = {
  name: "",
  code: "",
  type: "",
  contactEmail: "",
  status: "Active",
};

export function OrganizationForm({ initialData = defaultFormData, isEdit = false, onSubmit }: OrganizationFormProps) {
  const [formData, setFormData] = useState<Partial<Organization>>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof Organization, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof Organization]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Organization, string>> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Organization Name is required";
    }

    if (!formData.code?.trim()) {
      newErrors.code = "Code is required";
    }

    if (!formData.type?.trim()) {
      newErrors.type = "Type is required";
    }

    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = "Contact Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail || "")) {
      newErrors.contactEmail = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {isEdit ? "Edit Organization" : "Add New Organization"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update organization information" : "Create a new organization"}
          </p>
        </div>
        <Link
          href="/admin/organization"
          className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Organizations</span>
        </Link>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">🏢</span>
              </div>
              Organization Information
            </h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.name 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter organization name"
            />
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.name}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Code *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.code 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter code (e.g., ORG)"
            />
            {errors.code && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.code}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.type 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter type (e.g., Technology)"
            />
            {errors.type && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.type}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.contactEmail 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter contact email"
            />
            {errors.contactEmail && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.contactEmail}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </motion.select>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
        >
          <Link
            href="/admin/organization"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-green-800 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            {isEdit ? "Update Organization" : "Create Organization"}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
