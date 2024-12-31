import React from 'react';
import { Users, Clock, TrendingUp } from 'lucide-react';
import type { ReviewStatistics } from '../../../types/analytics';

interface ReviewStatsProps {
  stats: ReviewStatistics;
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Statistics</h3>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-indigo-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Reviewers</p>
              <p className="text-xl font-semibold text-gray-900">{stats.activeReviewers}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Avg. Review Time</p>
              <p className="text-xl font-semibold text-gray-900">{stats.averageReviewDays} days</p>
            </div>
          </div>

          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-xl font-semibold text-gray-900">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}