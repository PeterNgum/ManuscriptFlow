import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { ReviewList } from '../../reviews/ReviewList';
import { ReviewRoundStatus } from './ReviewRoundStatus';
import { ReviewRoundDecision } from './ReviewRoundDecision';
import type { ReviewRoundWithDetails, ReviewRoundDecision as Decision } from '../../../types/reviewRound';

interface ReviewRoundItemProps {
  round: ReviewRoundWithDetails;
  onComplete: (roundId: string, decision: Decision, notes?: string) => Promise<void>;
}

export function ReviewRoundItem({ round, onComplete }: ReviewRoundItemProps) {
  const [showDecision, setShowDecision] = useState(false);
  const isCompleted = round.status === 'completed';
  const completedReviews = round.reviews.filter(r => r.status === 'completed');
  const totalReviews = round.reviews.length;
  const canComplete = !isCompleted && completedReviews.length === totalReviews && totalReviews > 0;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Round {round.round_number}
            </h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Started {new Date(round.started_at).toLocaleDateString()}
              </span>
              {isCompleted && round.completed_at && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    Completed {new Date(round.completed_at).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ReviewRoundStatus status={round.status} />
            {canComplete && !showDecision && (
              <button
                onClick={() => setShowDecision(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Complete Round
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-500">
            {completedReviews.length} of {totalReviews} reviews completed
          </span>
        </div>
      </div>

      {showDecision && (
        <div className="p-4 border-b border-gray-200">
          <ReviewRoundDecision
            onSubmit={async (decision, notes) => {
              await onComplete(round.id, decision, notes);
              setShowDecision(false);
            }}
          />
        </div>
      )}

      <ReviewList reviews={round.reviews} />
    </div>
  );
}