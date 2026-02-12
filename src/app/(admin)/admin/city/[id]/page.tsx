"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CityForm } from '@/components/admin/CityForm';
import { CityFormData } from '@/lib/types/admin.types';
import { useCities } from '@/hooks/useCities';

export default function EditCityPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = params.id as string;
  const { cities, updateCity, loading: citiesLoading } = useCities();
  
  const [cityData, setCityData] = useState<CityFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cities.length > 0) {
      const city = cities.find(c => c.id === cityId);
      if (city) {
        setCityData({ name: city.name });
      }
      setLoading(false);
    } else if (!citiesLoading) {
      setLoading(false);
    }
  }, [cityId, cities, citiesLoading]);

  const handleSubmit = async (formData: CityFormData) => {
    try {
      await updateCity(cityId, formData);
      alert('City updated successfully!');
      router.push('/admin/city');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update city');
    }
  };

  if (loading || citiesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading city data...</div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">City not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CityForm 
        initialData={cityData} 
        onSubmit={handleSubmit} 
        isEdit={true} 
      />
    </div>
  );
}
