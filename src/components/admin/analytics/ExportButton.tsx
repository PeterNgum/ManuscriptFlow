import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { AnalyticsData } from '../../../types/analytics';

interface ExportButtonProps {
  data: AnalyticsData;
}

export function ExportButton({ data }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const csv = generateCSV(data);
      downloadCSV(csv, `analytics-${new Date().toISOString().split('T')[0]}.csv`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      <Download className="h-4 w-4 mr-2" />
      {exporting ? 'Exporting...' : 'Export Data'}
    </button>
  );
}

function generateCSV(data: AnalyticsData): string {
  const headers = [
    'Date',
    'Total Manuscripts',
    'In Review',
    'Approved',
    'Rejected',
    'Active Reviewers',
    'Completion Rate'
  ].join(',');

  const rows = data.submissionTrends.map((trend, index) => [
    trend.date,
    data.manuscriptStats.total,
    data.manuscriptStats.inReview,
    data.manuscriptStats.approved,
    data.manuscriptStats.rejected,
    data.reviewStats.activeReviewers,
    data.reviewTrends[index]?.value || ''
  ].join(','));

  return [headers, ...rows].join('\n');
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}