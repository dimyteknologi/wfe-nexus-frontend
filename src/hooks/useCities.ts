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

  const createCity = async (cityData: CityFormData) => {
    try {
      const newCity = await apiClient.post('/kota', cityData);
      setCities(prev => [...prev, newCity]);
      return newCity;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create city');
    }
  };

  const updateCity = async (id: string, cityData: Partial<CityFormData>) => {
    try {
      const updatedCity = await apiClient.put(`/city/${id}`, cityData);
      setCities(prev => prev.map(city => city.id === id ? updatedCity : city));
      return updatedCity;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update city');
    }
  };

  const deleteCity = async (id: string) => {
    try {
      await apiClient.delete(`/city/${id}`);
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
