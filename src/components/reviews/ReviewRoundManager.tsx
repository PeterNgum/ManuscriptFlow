import React, { useState } from 'react';
import { reviewRoundsService } from '../../services/reviewRounds.service';
import { ReviewWorkflow } from './ReviewWorkflow';
import { ReviewRoundStatus } from './ReviewRoundStatus';
import type { ReviewRoundWithDetails } from '../../types/reviewRound';

interface ReviewRoundManagerProps {
  manuscriptId: string;
  currentRound: ReviewRoundWithDetails | null;
  onRoundComplete?: () => void;
}

export function ReviewRoundManager({ manuscriptId, currentRound, onRoundComplete }: ReviewRoundManagerProps) {
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const handleStartNewRound = async () => {
    setStarting(true);
    setError(null);

    try {
      await reviewRoundsService.startNewRound(manuscriptId, currentRound?.template_id || '');
      onRoundComplete?.();
    } catch (err) {
      setError('Failed to start new review round');
      console.error(err);
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {currentRound ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Review Round {currentRound.round_number}
              </h3>
              <ReviewRoundStatus status={currentRound.status} />
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <ReviewWorkflow
              manuscriptId={manuscriptId}
              onComplete={onRoundComplete}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500 mb-4">No active review round</p>
          <button
            onClick={handleStartNewRound}
            disabled={starting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {starting ? 'Starting...' : 'Start New Round'}
          </button>
        </div>
      )}
    </div>
  );
}