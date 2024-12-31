import { useState } from 'react';
import { reviewResponsesService } from '../services/reviewResponses.service';
import type { ReviewResponseInput } from '../types/reviewResponse';

export function useReviewResponses(reviewId: string) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitResponses = async (responses: ReviewResponseInput[]) => {
    setSubmitting(true);
    setError(null);

    try {
      await reviewResponsesService.create(reviewId, responses);
    } catch (err) {
      setError('Failed to submit review responses');
      console.error(err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitResponses,
    submitting,
    error
  };
}