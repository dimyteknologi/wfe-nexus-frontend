"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RoleForm } from '@/components/admin/RoleForm';
import { Role } from '@/lib/types/admin.types';
import { useRoles } from '@/hooks/useRoles';

export default function EditRolePage() {
  const params = useParams();
  const router = useRouter();
  const roleId = Number(params.id);
  const { roles, updateRole, loading: rolesLoading } = useRoles();
  
  const [roleData, setRoleData] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roles.length > 0) {
      const role = roles.find(r => r.id === roleId);
      if (role) {
        setRoleData(role);
      }
      setLoading(false);
    } else if (!rolesLoading) {
        setLoading(false);
    }
  }, [roleId, roles, rolesLoading]);

  const handleSubmit = async (formData: Partial<Role>) => {
    try {
      await updateRole(roleId, formData);
      alert('Role updated successfully!');
      router.push('/admin/role');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  if (loading || rolesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading role data...</div>
      </div>
    );
  }

  if (!roleData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Role not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoleForm 
        initialData={roleData} 
        onSubmit={handleSubmit} 
        isEdit={true} 
      />
    </div>
  );
}
