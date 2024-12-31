import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { ReviewerStatistics } from '../../../types/reviewer';

interface ReviewerStatsProps {
  stats: ReviewerStatistics;
}

export function ReviewerStats({ stats }: ReviewerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-indigo-500 mr-2" />
          <span className="text-sm font-medium text-gray-500">Average Response Time</span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.averageResponseDays} days
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-gray-500">Completed Reviews</span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.completedReviews}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-500">Pending Reviews</span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.pendingReviews}
        </p>
      </div>
    </div>
  );
}