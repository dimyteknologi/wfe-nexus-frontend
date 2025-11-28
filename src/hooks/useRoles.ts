import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/api';
import { Role } from '@/lib/types/admin.types';
import { DUMMY_ROLES } from '@/lib/dummy-data';

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/role');
      setRoles(response.data);
      console.log(response.data)
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (roleData: Omit<Role, 'id'>) => {
    try {
      const response = await apiClient.post('/role', roleData);
      const newRole = response.data;
      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create role');
    }
  };

  const updateRole = async (id: number, roleData: Partial<Role>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = DUMMY_ROLES.findIndex(r => r.id === id);
      if (index !== -1) {
        DUMMY_ROLES[index] = { ...DUMMY_ROLES[index], ...roleData };
        setRoles([...DUMMY_ROLES]);
        return DUMMY_ROLES[index];
      }
      throw new Error('Role not found');
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  const deleteRole = async (id: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = DUMMY_ROLES.findIndex(r => r.id === id);
      if (index !== -1) {
        DUMMY_ROLES.splice(index, 1);
        setRoles([...DUMMY_ROLES]);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete role');
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
  };
}
