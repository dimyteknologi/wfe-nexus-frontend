"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserFormData, Role, City, Organization } from "@/lib/types/admin.types";
import { apiClient } from "@/lib/api/api";

interface UserFormProps {
  initialData?: UserFormData;
  isEdit?: boolean;
  onSubmit: (data: UserFormData) => void;
}

const defaultFormData: UserFormData = {
  name: "",
  email: "",
  password: "",
  roleId: "",
  cityId: "",
  institutionId: "",
  status: "Active",
  phone: "",
  department: "",
  joinDate: new Date().toISOString().split("T")[0],
};

export function UserForm({ initialData = defaultFormData, isEdit = false, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>(initialData);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [rolesData, citiesData, orgsData] = await Promise.all([
          apiClient.get('/role'),
          apiClient.get('/kota'),
          apiClient.get('/institusi')
        ]);
        setRoles(rolesData);
        setCities(citiesData);
        setOrganizations(orgsData);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!isEdit && !formData.password?.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.roleId) {
      newErrors.roleId = "Role is required";
    }

    if (!formData.cityId) {
      newErrors.cityId = "City is required";
    }

    if (!formData.institutionId) {
      newErrors.institutionId = "Organization is required";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.department?.trim()) {
      newErrors.department = "Department is required";
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
            {isEdit ? "Edit User" : "Add New User"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update user information" : "Create a new user account"}
          </p>
        </div>
        <Link
          href="/admin/users"
          className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Users</span>
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
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Personal Information
            </h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
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
              placeholder="Enter full name"
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
              Email Address *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? "border-red-300 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                }`}
                placeholder="Enter password"
              />
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.phone 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.department 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder="Enter department"
            />
            {errors.department && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.department}
              </motion.p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Account Settings
            </h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Role *
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.roleId 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              disabled={loadingOptions}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </motion.select>
            {errors.roleId && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.roleId}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.cityId 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              disabled={loadingOptions}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </motion.select>
            {errors.cityId && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.cityId}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization *
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              name="institutionId"
              value={formData.institutionId}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.institutionId 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
              disabled={loadingOptions}
            >
              <option value="">Select Organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </motion.select>
            {errors.institutionId && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.institutionId}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Status *
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

          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join Date
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                disabled
              />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
        >
          <Link
            href="/admin/users"
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
            {isEdit ? "Update User" : "Create User"}
          </motion.button>
        </motion.div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-blue-50 rounded-2xl p-6"
      >
        <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quick Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Ensure all required fields (marked with *) are filled</li>
          <li>• Use a valid email address for account verification</li>
          <li>• Select the correct Role, City, and Organization</li>
          <li>• Set status to  {"\"Inactive\""} for temporary account suspension</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}