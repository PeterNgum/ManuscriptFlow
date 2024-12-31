import React from 'react';
import { Plus } from 'lucide-react';
import { ReviewRoundList } from './ReviewRoundList';
import type { ReviewRoundWithDetails } from '../../../types/reviewRound';

interface ReviewRoundSectionProps {
  rounds: ReviewRoundWithDetails[];
  canStartNewRound: boolean;
  onStartNewRound: () => Promise<void>;
  onCompleteRound: (roundId: string) => Promise<void>;
}

export function ReviewRoundSection({
  rounds,
  canStartNewRound,
  onStartNewRound,
  onCompleteRound
}: ReviewRoundSectionProps) {
  const hasInProgressRound = rounds.some(round => round.status === 'in_progress');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Review Rounds</h2>
        {canStartNewRound && !hasInProgressRound && (
          <button
            onClick={onStartNewRound}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Start New Round
          </button>
        )}
      </div>

      <ReviewRoundList
        rounds={rounds}
        onCompleteRound={onCompleteRound}
      />
    </div>
  );
}