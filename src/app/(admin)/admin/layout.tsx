"use client";

import React from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/Header";
import { AdminSidebar } from "@/components/admin/Sidebar";
import Image from "next/image";
import { Loading } from "@/components/loading/Loading";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
      return <Loading className="h-screen" />; 
  }

  const userPermissions = session?.user?.permissions || [];
  const hasDashboardPermission = Array.isArray(userPermissions) 
    ? userPermissions.some((p: any) => 
        typeof p === 'string' ? p === "read:dashboard" : p.permissionCode === "read:dashboard"
      )
    : false;

  if (!session || (session.user.role !== "Admin" && !hasDashboardPermission)) {
      redirect("/login");
  }
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Image
        className="absolute w-full h-full opacity-5 object-cover -z-10"
        src="/assets/image-demo-3.svg"
        alt="background pattern"
        fill
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
