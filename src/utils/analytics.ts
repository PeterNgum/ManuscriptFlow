import type { AnalyticsData, TrendData } from '../types/analytics';

export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function formatLargeNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export function aggregateTrendData(data: TrendData[], period: 'day' | 'week' | 'month'): TrendData[] {
  // Implementation for aggregating trend data by period
  return data;
}