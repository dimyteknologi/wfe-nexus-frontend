"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RoleForm } from "@/components/admin/RoleForm";
import { Role } from "@/lib/types/admin.types";
import { useRoles } from "@/hooks/useRoles";

export default function AddRolePage() {
  const router = useRouter();
  const { createRole } = useRoles();

  const handleSubmit = async (formData: Partial<Role>) => {
    try {
      await createRole(formData as Omit<Role, 'id'>);
      alert("Role created successfully!");
      router.push("/admin/role");
    } catch (error) {
      console.error("Error creating role:", error);
      alert("Error creating role. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <RoleForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}
