'use client';

import { useState, useEffect } from 'react';
import { Organization } from '@/lib/types/admin.types';
import { DUMMY_ORGANIZATIONS } from '@/lib/dummy-data';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrganizations([...DUMMY_ORGANIZATIONS]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (orgData: Omit<Organization, 'id'>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newOrg = { 
        ...orgData, 
        id: Math.floor(Math.random() * 10000) + 100 
      } as Organization;
      DUMMY_ORGANIZATIONS.push(newOrg);
      setOrganizations([...DUMMY_ORGANIZATIONS]);
      return newOrg;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create organization');
    }
  };

  const updateOrganization = async (id: number, orgData: Partial<Organization>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = DUMMY_ORGANIZATIONS.findIndex(o => o.id === id);
      if (index !== -1) {
        DUMMY_ORGANIZATIONS[index] = { ...DUMMY_ORGANIZATIONS[index], ...orgData };
        setOrganizations([...DUMMY_ORGANIZATIONS]);
        return DUMMY_ORGANIZATIONS[index];
      }
      throw new Error('Organization not found');
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update organization');
    }
  };

  const deleteOrganization = async (id: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = DUMMY_ORGANIZATIONS.findIndex(o => o.id === id);
      if (index !== -1) {
        DUMMY_ORGANIZATIONS.splice(index, 1);
        setOrganizations([...DUMMY_ORGANIZATIONS]);
      }
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
