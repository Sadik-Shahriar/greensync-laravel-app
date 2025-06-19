
import { useState, useEffect } from 'react';
import { laravelAPI } from '@/services/api';
import { LaravelResponse } from '@/types/api';

// Generic hook for Laravel API data fetching
export function useLaravelData<T>(
  apiCall: () => Promise<LaravelResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Specific hooks for common data
export function useRealTimeStats() {
  return useLaravelData(() => laravelAPI.getRealTimeStats());
}

export function useLeaderboard() {
  return useLaravelData(() => laravelAPI.getLeaderboard());
}

export function usePartners() {
  return useLaravelData(() => laravelAPI.getPartners());
}

export function useDashboardStats() {
  return useLaravelData(() => laravelAPI.getDashboardStats());
}

export function useUserBottleStats() {
  return useLaravelData(() => laravelAPI.getUserBottleStats());
}
