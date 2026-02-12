import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://76.13.193.52:4000',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      const headers = config.headers as Record<string, string>;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
         // Import dynamically to avoid circular dependencies if any, 
         // though standard import usually works for next-auth/react
         const { signOut } = await import("next-auth/react");
         signOut({ callbackUrl: "/api/auth/signin" });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
