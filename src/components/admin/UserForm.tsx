"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserFormData, Role, City, Organization } from "@/lib/types/admin.types";
import { apiClient } from "@/lib/api/api";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { UserPlus, ArrowLeft, Mail, Phone, Briefcase, Building, MapPin, Calendar, Shield, Info } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? "Edit User" : "Add New User"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update user information and access" : "Create a new user account with proper access"}
          </p>
        </div>
        <Link
          href="/admin/users"
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Loading State */}
      {loadingOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12"
        >
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading form options...</p>
          </div>
        </motion.div>
      )}

      {/* Form Card */}
      {!loadingOptions && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8"
        >
          {/* Personal Information Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                <UserPlus className="w-5 h-5 text-emerald-600" />
              </div>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
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
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                  placeholder="Enter full name"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Email Address <span className="text-red-500 ml-1">*</span>
                  <Mail className="w-4 h-4 ml-2 text-gray-400" />
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                  placeholder="user@example.com"
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {!isEdit && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                      errors.password 
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    }`}
                    placeholder="Enter secure password"
                  />
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {errors.password}
                    </motion.p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Password must be strong and secure
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Phone Number <span className="text-red-500 ml-1">*</span>
                  <Phone className="w-4 h-4 ml-2 text-gray-400" />
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                  placeholder="+62 xxx-xxxx-xxxx"
                />
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Department <span className="text-red-500 ml-1">*</span>
                  <Briefcase className="w-4 h-4 ml-2 text-gray-400" />
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.department 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                  placeholder="e.g., IT Department"
                />
                {errors.department && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.department}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          {/* Account & Organization Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-teal-600" />
              </div>
              Account & Organization
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User Role <span className="text-red-500">*</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.roleId 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
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
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.roleId}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  City <span className="text-red-500 ml-1">*</span>
                  <MapPin className="w-4 h-4 ml-2 text-gray-400" />
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.cityId 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
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
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.cityId}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Organization <span className="text-red-500 ml-1">*</span>
                  <Building className="w-4 h-4 ml-2 text-gray-400" />
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="institutionId"
                  value={formData.institutionId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.institutionId 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
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
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.institutionId}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Status <span className="text-red-500">*</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </motion.select>
                <div className="mt-2">
                  <Badge variant={formData.status === "Active" ? "success" : "default"}>
                    {formData.status}
                  </Badge>
                </div>
              </div>

              {isEdit && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    Join Date
                    <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
                    disabled
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Member since {formData.joinDate ? new Date(formData.joinDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 rounded-xl p-6"
          >
            <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Quick Tips
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ensure all required fields (marked with *) are properly filled</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use a valid email address for account verification and notifications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Select appropriate Role, City, and Organization for proper access control</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Set status to "Inactive" for temporary account suspension</span>
              </li>
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
          >
            <Link href="/admin/users">
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
              {isEdit ? "Update User" : "Create User"}
            </Button>
          </motion.div>
        </motion.form>
      )}
    </motion.div>
  );
}