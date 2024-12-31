import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analytics.service';
import type { AnalyticsData } from '../types/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const analyticsData = await analyticsService.getAnalytics();
        setData(analyticsData);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  return { data, loading, error };
}