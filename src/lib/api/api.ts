import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.63.24.47:4000';

const getAuthHeader = async (): Promise<Record<string, string>> => {
  const session = await getSession();
  if (session?.accessToken) {
    return { 'Authorization': `Bearer ${session.accessToken}` };
  }
  return {};
};

export const apiClient = {
  async get(endpoint: string) {
    const authHeader = await getAuthHeader();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...authHeader
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  },

  async post(endpoint: string, data: unknown) {
    const authHeader = await getAuthHeader();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...authHeader
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create data');
    return response.json();
  },

  async put(endpoint: string, data: unknown) {
    const authHeader = await getAuthHeader();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...authHeader
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update data');
    return response.json();
  },

  async delete(endpoint: string) {
    const authHeader = await getAuthHeader();
    const headers: Record<string, string> = {
      ...authHeader
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Failed to delete data');
    return response.json();
  },
};