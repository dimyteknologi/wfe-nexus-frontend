"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PermissionForm } from '@/components/admin/PermissionForm';
import { PermissionFormData } from '@/lib/types/admin.types';
import { usePermissions } from '@/hooks/usePermissions';

export default function EditPermissionPage() {
  const params = useParams();
  const router = useRouter();
  const permissionId = params.id as string;
  const { permissions, updatePermission, loading: permissionsLoading } = usePermissions();
  
  const [permissionData, setPermissionData] = useState<PermissionFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (permissions.length > 0) {
      const permission = permissions.find(p => p.id === permissionId);
      if (permission) {
        setPermissionData({ 
          permissionName: permission.permissionName,
          permissionCode: permission.permissionCode
        });
      }
      setLoading(false);
    } else if (!permissionsLoading) {
      setLoading(false);
    }
  }, [permissionId, permissions, permissionsLoading]);

  const handleSubmit = async (formData: PermissionFormData) => {
    try {
      await updatePermission(permissionId, formData);
      alert('Permission updated successfully!');
      router.push('/admin/permission');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update permission');
    }
  };

  if (loading || permissionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading permission data...</div>
      </div>
    );
  }

  if (!permissionData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Permission not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PermissionForm 
        initialData={permissionData} 
        onSubmit={handleSubmit} 
        isEdit={true} 
      />
    </div>
  );
}
