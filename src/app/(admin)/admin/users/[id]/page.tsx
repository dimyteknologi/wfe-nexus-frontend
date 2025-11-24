// app/admin/users/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserForm } from '@/components/admin/UserForm';
import { UserFormData } from '@/lib/types/admin.types';
import { apiClient } from '@/lib/api/api';


export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get(`/users/${userId}`);
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: UserFormData) => {
    try {
      await apiClient.put(`/users/${userId}`, formData);
      alert('User updated successfully!');
      router.push('/admin/users');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserForm 
        initialData={userData} 
        onSubmit={handleSubmit} 
        isEdit={true} 
      />
    </div>
  );
}