import { useState } from 'react';
import { reviewRoundsService } from '../services/reviewRounds.service';
import type { ReviewRoundDecision } from '../types/reviewRound';

export function useReviewRound(manuscriptId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNewRound = async (templateId: string) => {
    setLoading(true);
    setError(null);

    try {
      await reviewRoundsService.startNewRound(manuscriptId, templateId);
    } catch (err) {
      setError('Failed to start new review round');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeRound = async (roundId: string, decision: ReviewRoundDecision) => {
    setLoading(true);
    setError(null);

    try {
      await reviewRoundsService.completeRound(roundId, decision);
    } catch (err) {
      setError('Failed to complete review round');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    startNewRound,
    completeRound,
    loading,
    error
  };
}