"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { Home, Users, Building2, MapPin, Shield, LogOut } from "lucide-react";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/organization", label: "Organizations", icon: Building2 },
  { href: "/admin/city", label: "Cities", icon: MapPin },
  { href: "/admin/role", label: "Roles", icon: Shield },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl z-50"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-slate-400">WEF Nexus DSS</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-green-600/20 text-green-400 border-l-4 border-green-500 shadow-lg"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white border-l-4 border-transparent"
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                    isActive ? "text-green-400" : "text-slate-400 group-hover:text-white"
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/50 backdrop-blur-sm border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="font-bold text-white">A</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">Admin User</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signOut({ callbackUrl: window.location.origin })}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition-all duration-200 border border-red-600/30"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
