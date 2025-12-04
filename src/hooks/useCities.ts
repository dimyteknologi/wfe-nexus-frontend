import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/api';
import { City, CityFormData } from '@/lib/types/admin.types';

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/kota');
      const cityList = Array.isArray(data) ? data : (data.data || []);
      setCities(cityList);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  const getCityById = async (id: string) => {
    try {
      setLoading(true);
      const data = await apiClient.get(`/kota/${id}`);
      const city = data.data || data;
      setError(null);
      return city;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch city');
    } finally {
      setLoading(false);
    }
  };

  const createCity = async (cityData: CityFormData) => {
    try {
      const response = await apiClient.post('/kota', cityData);
      const newCity = response.data || response;
      setCities(prev => [...prev, newCity]);
      return newCity;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create city');
    }
  };

  const updateCity = async (id: string, cityData: Partial<CityFormData>) => {
    try {
      const response = await apiClient.put(`/kota/${id}`, cityData);
      const updatedCity = response.data || response;
      setCities(prev => prev.map(city => city.id === id ? updatedCity : city));
      return updatedCity;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update city');
    }
  };

  const deleteCity = async (id: string) => {
    try {
      await apiClient.delete(`/kota/${id}`);
      setCities(prev => prev.filter(city => city.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete city');
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
    refetch: fetchCities,
    createCity,
    updateCity,
    deleteCity,
  };
}
