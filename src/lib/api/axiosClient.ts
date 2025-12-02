import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://103.63.24.47:4000',
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

export default axiosInstance;
