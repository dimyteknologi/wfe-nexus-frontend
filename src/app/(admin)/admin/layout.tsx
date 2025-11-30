"use client";

import React from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/Header";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <img
        className="absolute w-full h-full opacity-5 object-cover -z-10"
        src="/assets/image-demo-3.svg"
        alt="background pattern"
      />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col ml-64">
          <AdminHeader />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-6 pt-24 overflow-auto"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
