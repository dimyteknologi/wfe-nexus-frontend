"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/organization", label: "Organizations", icon: "🏢" },
  { href: "/admin/city", label: "Cities", icon: "🗺️" },
  { href: "/admin/role", label: "Roles", icon: "🔐" },
  { href: "/admin/permission", label: "Permissions", icon: "🛡️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
    >
      <div className="p-6 border-b border-gray-200">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-green-800"
        >
          Admin Panel
        </motion.h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                href={item.href}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-green-100 text-green-800 shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-green-800">A</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Admin User</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
