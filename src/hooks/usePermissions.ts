import { useState, useEffect } from 'react';
import { Permission, PermissionFormData, AssignPermissionPayload } from '@/lib/types/admin.types';
import { apiClient } from '@/lib/api/api';

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/permissions');
      const permissionList = Array.isArray(data) ? data : (data.data || []);
      setPermissions(permissionList);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  const createPermission = async (permissionData: PermissionFormData) => {
    try {
      const newPermission = await apiClient.post('/permissions', permissionData);
      setPermissions(prev => [...prev, newPermission]);
      return newPermission;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create permission');
    }
  };

  const updatePermission = async (id: string, permissionData: Partial<PermissionFormData>) => {
    try {
      const updatedPermission = await apiClient.put(`/permissions/${id}`, permissionData);
      setPermissions(prev => prev.map(permission => permission.id === id ? updatedPermission : permission));
      return updatedPermission;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update permission');
    }
  };

  const deletePermission = async (id: string) => {
    try {
      await apiClient.delete(`/permissions/${id}`);
      setPermissions(prev => prev.filter(permission => permission.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete permission');
    }
  };

  const assignPermissionsToRole = async (payload: AssignPermissionPayload) => {
    try {
      await apiClient.post('/permissions/assign-to-role', payload);
      // Refetch permissions to get updated role assignments
      await fetchPermissions();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to assign permissions');
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return {
    permissions,
    loading,
    error,
    refetch: fetchPermissions,
    createPermission,
    updatePermission,
    deletePermission,
    assignPermissionsToRole,
  };
}
