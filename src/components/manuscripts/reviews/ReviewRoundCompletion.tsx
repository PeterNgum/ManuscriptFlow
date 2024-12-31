import React, { useState } from 'react';
import { useReviewRound } from '../../../hooks/useReviewRound';
import { ReviewRoundDecision } from './ReviewRoundDecision';
import type { ReviewRoundDecision as Decision } from '../../../types/reviewRound';

interface ReviewRoundCompletionProps {
  roundId: string;
  onComplete: () => void;
}

export function ReviewRoundCompletion({ roundId, onComplete }: ReviewRoundCompletionProps) {
  const { completeRound, submitting, error } = useReviewRound();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (decision: Decision, notes?: string) => {
    try {
      await completeRound(roundId, decision, notes);
      onComplete();
      setShowForm(false);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Complete Round
      </button>
    );
  }

  return (
    <div className="p-4 border-t border-gray-200">
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <ReviewRoundDecision
        onSubmit={handleSubmit}
        disabled={submitting}
      />
    </div>
  );
}