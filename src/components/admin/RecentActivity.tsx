import React from 'react';
import { useActivity } from '../../hooks/useActivity';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { formatRelativeTime } from '../../utils/dateUtils';

export function RecentActivity() {
  const { activities, loading, error } = useActivity();

  if (loading) return <LoadingSpinner />;
  if (error) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities?.map((activity, idx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {idx !== activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {formatRelativeTime(new Date(activity.timestamp))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}