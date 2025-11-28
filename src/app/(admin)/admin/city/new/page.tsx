"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CityForm } from "@/components/admin/CityForm";
import { CityFormData } from "@/lib/types/admin.types";
import { useCities } from "@/hooks/useCities";

export default function AddCityPage() {
  const router = useRouter();
  const { createCity } = useCities();

  const handleSubmit = async (formData: CityFormData) => {
    try {
      await createCity(formData);
      alert("City created successfully!");
      router.push("/admin/city");
    } catch (error) {
      console.error("Error creating city:", error);
      alert(error instanceof Error ? error.message : "Error creating city. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <CityForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}
