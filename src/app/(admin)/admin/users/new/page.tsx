"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserForm } from "@/components/admin/UserForm";
import { UserFormData } from "@/lib/types/admin.types";
import { useUsers } from "@/hooks/useUsers";


export default function AddUserPage() {
  const router = useRouter();
  const { createUser } = useUsers();

  const handleSubmit = async (formData: UserFormData) => {
    try {
      await createUser(formData);
      alert("User created successfully!");
      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error instanceof Error ? error.message : "Error creating user. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <UserForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}