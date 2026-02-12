'use client';

import { useState, useEffect } from 'react';
import { Organization, OrganizationFormData } from '@/lib/types/admin.types';
import { apiClient } from '@/lib/api/api';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/institusi');
      const orgList = Array.isArray(data) ? data : (data.data || []);
      setOrganizations(orgList);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (orgData: OrganizationFormData) => {
    try {
      const response = await apiClient.post('/institusi', orgData);
      const newOrg = response.data || response;
      setOrganizations(prev => [...prev, newOrg]);
      return newOrg;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create organization');
    }
  };

  const updateOrganization = async (id: string, orgData: Partial<OrganizationFormData>) => {
    try {
      const response = await apiClient.put(`/institusi/${id}`, orgData);
      const updatedOrg = response.data || response;
      setOrganizations(prev => prev.map(org => org.id === id ? updatedOrg : org));
      return updatedOrg;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update organization');
    }
  };

  const deleteOrganization = async (id: string) => {
    try {
      await apiClient.delete(`/institusi/${id}`);
      setOrganizations(prev => prev.filter(org => org.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete organization');
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return {
    organizations,
    loading,
    error,
    refetch: fetchOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
}
