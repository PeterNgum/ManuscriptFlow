import React from 'react';
import { ManuscriptStats } from '../../components/admin/analytics/ManuscriptStats';
import { ReviewStats } from '../../components/admin/analytics/ReviewStats';
import { TrendChart } from '../../components/admin/analytics/TrendChart';
import { ExportButton } from '../../components/admin/analytics/ExportButton';
import { useAnalyticsPolling } from '../../hooks/useAnalyticsPolling';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export function AnalyticsDashboard() {
  const { data, loading, error } = useAnalyticsPolling();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <ExportButton data={data} />
      </div>
      
      <div className="space-y-6">
        <ManuscriptStats stats={data.manuscriptStats} />
        <ReviewStats stats={data.reviewStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart
            title="Manuscript Submissions"
            data={data.submissionTrends}
            dataKey="submissions"
          />
          <TrendChart
            title="Review Completion Rate"
            data={data.reviewTrends}
            dataKey="completionRate"
            valueFormatter={(value) => `${value}%`}
          />
        </div>
      </div>
    </div>
  );
}