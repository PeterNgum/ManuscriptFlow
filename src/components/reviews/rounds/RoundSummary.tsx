import React from 'react';
import { Clock, Users } from 'lucide-react';
import type { ReviewRoundWithDetails } from '../../../types/reviewRound';

interface RoundSummaryProps {
  round: ReviewRoundWithDetails;
}

export function RoundSummary({ round }: RoundSummaryProps) {
  const completedReviews = round.reviews.filter(r => r.status === 'completed');
  const totalReviews = round.reviews.length;
  const completionPercentage = totalReviews > 0 
    ? Math.round((completedReviews.length / totalReviews) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Round {round.round_number} Summary
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {round.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Started: {new Date(round.started_at).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span>Reviews: {completedReviews.length} of {totalReviews} completed</span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-indigo-600">
                Completion Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
            <div
              style={{ width: `${completionPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}