import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics.service';
import type { AnalyticsData } from '../types/analytics';

export function useAnalyticsPolling(interval = 30000) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const analyticsData = await analyticsService.getAnalytics();
      setData(analyticsData);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, interval);
    return () => clearInterval(pollInterval);
  }, [fetchData, interval]);

  return { data, loading, error, refresh: fetchData };
}