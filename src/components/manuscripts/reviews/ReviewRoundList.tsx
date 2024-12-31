import React from 'react';
import { ReviewRoundItem } from './ReviewRoundItem';
import type { ReviewRoundWithDetails } from '../../../types/reviewRound';

interface ReviewRoundListProps {
  rounds: ReviewRoundWithDetails[];
  onCompleteRound: (roundId: string) => Promise<void>;
}

export function ReviewRoundList({ rounds, onCompleteRound }: ReviewRoundListProps) {
  if (rounds.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">No review rounds yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rounds.map((round) => (
        <ReviewRoundItem
          key={round.id}
          round={round}
          onComplete={onCompleteRound}
        />
      ))}
    </div>
  );
}