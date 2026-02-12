"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PermissionForm } from "@/components/admin/PermissionForm";
import { PermissionFormData } from "@/lib/types/admin.types";
import { usePermissions } from "@/hooks/usePermissions";

export default function AddPermissionPage() {
  const router = useRouter();
  const { createPermission } = usePermissions();

  const handleSubmit = async (formData: PermissionFormData) => {
    try {
      await createPermission(formData);
      alert("Permission created successfully!");
      router.push("/admin/permission");
    } catch (error) {
      console.error("Error creating permission:", error);
      alert(error instanceof Error ? error.message : "Error creating permission. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <PermissionForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}
