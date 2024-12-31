import React from 'react';
import { UserPlus } from 'lucide-react';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ReviewerListProps {
  reviewers: Profile[];
  onAssign: (reviewerId: string) => void;
}

export function ReviewerList({ reviewers, onAssign }: ReviewerListProps) {
  if (reviewers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No available reviewers
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {reviewers.map((reviewer) => (
        <li key={reviewer.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {reviewer.first_name} {reviewer.last_name}
              </h3>
              {reviewer.organization && (
                <p className="text-sm text-gray-500">
                  {reviewer.organization}
                </p>
              )}
              {reviewer.expertise_areas.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {reviewer.expertise_areas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onAssign(reviewer.id)}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}