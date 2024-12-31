import React from 'react';
import { useStats } from '../../hooks/useStats';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export function AdminStats() {
  const { stats, loading, error } = useStats();

  if (loading) return <LoadingSpinner />;
  if (error) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Overview</h2>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Total Manuscripts
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats?.totalManuscripts || 0}
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Pending Reviews
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats?.pendingReviews || 0}
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Active Reviewers
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats?.activeReviewers || 0}
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Average Review Time
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats?.avgReviewDays || 0} days
          </dd>
        </div>
      </dl>
    </div>
  );
}