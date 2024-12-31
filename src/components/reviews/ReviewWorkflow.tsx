import React, { useState, useEffect } from 'react';
import { reviewRoundsService } from '../../services/reviewRounds.service';
import { ReviewResponseForm } from './ReviewResponseForm';
import { ReviewResponseList } from './ReviewResponseList';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import type { ReviewRoundWithDetails } from '../../types/reviewRound';

interface ReviewWorkflowProps {
  manuscriptId: string;
  onComplete?: () => void;
}

export function ReviewWorkflow({ manuscriptId, onComplete }: ReviewWorkflowProps) {
  const [currentRound, setCurrentRound] = useState<ReviewRoundWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentRound = async () => {
      try {
        const round = await reviewRoundsService.getCurrentRound(manuscriptId);
        setCurrentRound(round);
      } catch (err) {
        setError('Failed to load review round');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentRound();
  }, [manuscriptId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!currentRound) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No active review round</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Review Round {currentRound.round_number}
        </h3>

        {currentRound.template && (
          <ReviewResponseForm
            criteria={currentRound.template.criteria}
            onSubmit={async (responses) => {
              try {
                // Submit responses logic here
                onComplete?.();
              } catch (err) {
                console.error('Failed to submit review:', err);
              }
            }}
          />
        )}

        {currentRound.reviews?.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Submitted Reviews
            </h4>
            {currentRound.reviews.map((review) => (
              <div key={review.id} className="mb-6">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  {review.reviewer.first_name} {review.reviewer.last_name}
                </h5>
                <ReviewResponseList
                  responses={review.responses || []}
                  criteria={currentRound.template?.criteria || []}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}