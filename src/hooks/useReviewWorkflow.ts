import { useState, useEffect } from 'react';
import { reviewRoundsService } from '../services/reviewRounds.service';
import { reviewsService } from '../services/reviews.service';
import type { ReviewWorkflowState, ReviewSubmission } from '../types/reviewWorkflow';

export function useReviewWorkflow(manuscriptId: string) {
  const [state, setState] = useState<ReviewWorkflowState>({
    currentRound: null,
    canStartNewRound: false,
    canSubmitReview: false,
    canCompleteRound: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCurrentRound = async () => {
    try {
      const round = await reviewRoundsService.getCurrentRound(manuscriptId);
      setState(prev => ({
        ...prev,
        currentRound: round,
        canStartNewRound: !round,
        canSubmitReview: !!round && round.status === 'in_progress',
        canCompleteRound: !!round && round.reviews.every(r => r.status === 'completed')
      }));
    } catch (err) {
      setError('Failed to load review round');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentRound();
  }, [manuscriptId]);

  const startNewRound = async () => {
    setError(null);
    try {
      await reviewRoundsService.startNewRound(manuscriptId);
      await loadCurrentRound();
    } catch (err) {
      setError('Failed to start new review round');
      console.error(err);
      throw err;
    }
  };

  const submitReview = async (submission: ReviewSubmission) => {
    setError(null);
    try {
      await reviewsService.submitReview(submission);
      await loadCurrentRound();
    } catch (err) {
      setError('Failed to submit review');
      console.error(err);
      throw err;
    }
  };

  const completeRound = async (decision: string, notes?: string) => {
    setError(null);
    try {
      if (!state.currentRound) throw new Error('No active round');
      await reviewRoundsService.completeRound(state.currentRound.id, decision, notes);
      await loadCurrentRound();
    } catch (err) {
      setError('Failed to complete review round');
      console.error(err);
      throw err;
    }
  };

  return {
    ...state,
    loading,
    error,
    startNewRound,
    submitReview,
    completeRound,
    refresh: loadCurrentRound
  };
}