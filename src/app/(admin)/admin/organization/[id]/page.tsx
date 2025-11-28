"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { OrganizationForm } from '@/components/admin/OrganizationForm';
import { OrganizationFormData } from '@/lib/types/admin.types';
import { useOrganizations } from '@/hooks/useOrganizations';

export default function EditOrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.id as string;
  const { organizations, updateOrganization, loading: orgsLoading } = useOrganizations();
  
  const [orgData, setOrgData] = useState<OrganizationFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organizations.length > 0) {
      const org = organizations.find(o => o.id === orgId);
      if (org) {
        setOrgData({ name: org.name });
      }
      setLoading(false);
    } else if (!orgsLoading) {
        setLoading(false);
    }
  }, [orgId, organizations, orgsLoading]);

  const handleSubmit = async (formData: OrganizationFormData) => {
    try {
      await updateOrganization(orgId, formData);
      alert('Organization updated successfully!');
      router.push('/admin/organization');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update organization');
    }
  };

  if (loading || orgsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading organization data...</div>
      </div>
    );
  }

  if (!orgData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Organization not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrganizationForm 
        initialData={orgData} 
        onSubmit={handleSubmit} 
        isEdit={true} 
      />
    </div>
  );
}
