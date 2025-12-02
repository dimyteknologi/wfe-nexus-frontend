import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/api';
import { User, UserFormData } from '@/lib/types/admin.types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/user');
      // Ensure data is an array, handle potential wrapper object
      const userList = Array.isArray(data) ? data : (data.data || []);
      setUsers(userList);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: UserFormData) => {
    try {
      const payload = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        roleId: userData.roleId,
        cityId: userData.cityId,
        institutionId: userData.institutionId
      };
      const newUser = await apiClient.post('/user', payload);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const updateUser = async (id: string, userData: Partial<UserFormData>) => {
    try {
      const updatedUser = await apiClient.put(`/user/${id}`, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await apiClient.delete(`/user/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}