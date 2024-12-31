import { useState } from 'react';
import { useAnalyticsPolling } from './useAnalyticsPolling';
import { aggregateTrendData } from '../utils/analytics';
import type { TrendData } from '../types/analytics';

export function useAnalyticsDashboard() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const { data, loading, error, refresh } = useAnalyticsPolling();

  const aggregatedTrends = data ? {
    submissionTrends: aggregateTrendData(data.submissionTrends, period),
    reviewTrends: aggregateTrendData(data.reviewTrends, period)
  } : null;

  return {
    data,
    aggregatedTrends,
    period,
    setPeriod,
    loading,
    error,
    refresh
  };
}