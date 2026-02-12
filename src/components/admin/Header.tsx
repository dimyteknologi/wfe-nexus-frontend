"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";

export function AdminHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 right-0 left-64 bg-white shadow-sm z-40 border-b border-gray-200"
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, manage your system here
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>

          {/* User Dropdown */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <span className="font-bold text-white text-sm">A</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="font-semibold text-gray-900 text-sm">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  showDropdown ? 'rotate-180' : ''
                }`} 
              />
            </motion.div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-600">admin@wefnexus.com</p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Profile Settings</span>
                    </button>
                    
                    <div className="my-2 border-t border-gray-100"></div>
                    
                    <button
                      onClick={() => signOut({ callbackUrl: window.location.origin })}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
