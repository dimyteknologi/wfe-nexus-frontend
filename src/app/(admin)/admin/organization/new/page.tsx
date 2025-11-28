"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { OrganizationForm } from "@/components/admin/OrganizationForm";
import { Organization } from "@/lib/types/admin.types";
import { useOrganizations } from "@/hooks/useOrganizations";

export default function AddOrganizationPage() {
  const router = useRouter();
  const { createOrganization } = useOrganizations();

  const handleSubmit = async (formData: Partial<Organization>) => {
    try {
      await createOrganization(formData as Omit<Organization, 'id'>);
      alert("Organization created successfully!");
      router.push("/admin/organization");
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Error creating organization. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <OrganizationForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}
