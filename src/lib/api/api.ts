import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://76.13.193.52:4000';

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
    const text = await response.text();
    if (!response.ok) {
      console.error(`API Error (${response.status}) for ${endpoint}:`, text);
      throw new Error(text || `Failed to fetch data: ${response.status}`);
    }
    try {
      return JSON.parse(text);
    } catch (_e) {
      console.error(`JSON Parse Error for ${endpoint}:`, text);
      throw new Error('Invalid JSON response from server');
    }
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
    const text = await response.text();
    if (!response.ok) {
      // console.error(`API Error (${response.status}) for ${endpoint}:`, text);
      throw new Error(text || `Failed to create data: ${response.status}`);
    }
    try {
      return JSON.parse(text);
    } catch (_e) {
      // console.error(`JSON Parse Error for ${endpoint}:`, text);
      throw new Error('Invalid JSON response from server');
    }
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
    const text = await response.text();
    if (!response.ok) {
      // console.error(`API Error (${response.status}) for ${endpoint}:`, text);
      throw new Error(text || `Failed to update data: ${response.status}`);
    }
    try {
      return JSON.parse(text);
    } catch (_e) {
      // console.error(`JSON Parse Error for ${endpoint}:`, text);
      throw new Error('Invalid JSON response from server');
    }
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
    const text = await response.text();
    if (!response.ok) {
      // console.error(`API Error (${response.status}) for ${endpoint}:`, text);
      throw new Error(text || `Failed to delete data: ${response.status}`);
    }
    try {
      return JSON.parse(text);
    } catch (_e) {
      // console.error(`JSON Parse Error for ${endpoint}:`, text);
      throw new Error('Invalid JSON response from server');
    }
  },
};