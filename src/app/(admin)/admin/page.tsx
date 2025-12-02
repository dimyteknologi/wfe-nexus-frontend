"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: "👥",
      color: "blue",
    },
    {
      title: "Total Organization",
      value: "567",
      change: "+8%",
      icon: "🏢",
      color: "green",
    },
    {
      title: "Total Region",
      value: "24",
      change: "+5%",
      icon: "🗺️",
      color: "yellow",
    },
    {
      title: "Active Users",
      value: "789",
      change: "+15%",
      icon: "🟢",
      color: "purple",
    },
];


  const recentActivities = [
    { user: "John Doe", action: "created new product", time: "2 min ago" },
    { user: "Sarah Smith", action: "updated profile", time: "5 min ago" },
    { user: "Mike Johnson", action: "placed new order", time: "10 min ago" },
    { user: "Emily Brown", action: "registered account", time: "15 min ago" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600 text-sm">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Manage Users", icon: "👤", color: "green", href: "/admin/users" },
              { label: "Manage Organizations", icon: "🏢", color: "blue", href: "/admin/organization" },
              { label: "Manage Cities", icon: "🗺️", color: "purple", href: "/admin/city" },
              // { label: "Manage Roles", icon: "🔐", color: "orange", href: "/admin/role" },
              // { label: "Manage Permissions", icon: "🛡️", color: "red", href: "/admin/permission" }
            ].map((action, index) => (
              <Link key={action.label} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl border border-gray-400 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <span className="font-medium text-gray-800">
                    {action.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
