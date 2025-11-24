"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserForm } from "@/components/admin/UserForm";
import { UserFormData } from "@/lib/types/admin.types";


export default function AddUserPage() {
  const router = useRouter();

  const handleSubmit = async (formData: UserFormData) => {
    try {

      console.log("Creating user:", formData);

      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      alert("User created successfully!");
      
      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <UserForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}