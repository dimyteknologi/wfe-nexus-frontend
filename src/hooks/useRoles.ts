import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/api';
import { Role } from '@/lib/types/admin.types';

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/role');
      const rolesList = Array.isArray(response) ? response : (response.data || []);
      setRoles(rolesList);
      console.log(rolesList);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (roleData: Omit<Role, 'id'>) => {
    try {
      // Format the request body to match API requirements
      const requestBody = {
        name: roleData.name,
        permissionIds: roleData.permissionIds || []
      };
      
      const response = await apiClient.post('/role', requestBody);
      const newRole = response.data || response;
      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create role');
    }
  };

  const updateRole = async (id: string, roleData: Partial<Role>) => {
    try {
      // Strip extraneous properties that backend DTO rejects
      const { 
        id: _id, 
        createdAt, 
        updatedAt, 
        deletedAt, 
        updatedBy, 
        permissions,
        description,
        ...allowedData 
      } = roleData as any;

      const response = await apiClient.patch(`/role/${id}`, allowedData);
      const updatedRole = response.data || response;
      setRoles(prev => prev.map(role => role.id === id ? updatedRole : role));
      return updatedRole;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await apiClient.delete(`/role/${id}`);
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete role');
    }
  };

  const getRoleById = async (id: string) => {
    try {
      const response = await apiClient.get(`/role/${id}`);
      console.log(`[DEBUG] API Response for /role/${id}:`, response);
      if (!response) return { permissionIds: [], permissions: [] };
      // Handle standard nested backend response { data: { ...roleData } } 
      // or direct object response if API wraps it differently
      return response.data && typeof response.data === 'object' ? response.data : response;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch role details');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    refetch: fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    getRoleById,
  };
}
