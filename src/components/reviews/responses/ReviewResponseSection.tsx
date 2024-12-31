import React from 'react';
import { ReviewResponseList } from './ReviewResponseList';
import { ReviewResponseForm } from '../form/ReviewResponseForm';
import { useReviewResponses } from '../../../hooks/useReviewResponses';
import type { ReviewCriteria } from '../../../types/reviewTemplate';
import type { ReviewResponse } from '../../../types/reviewResponse';

interface ReviewResponseSectionProps {
  reviewId: string;
  criteria: ReviewCriteria[];
  existingResponses: ReviewResponse[];
  canSubmit: boolean;
  onResponseSubmitted: () => void;
}

export function ReviewResponseSection({
  reviewId,
  criteria,
  existingResponses,
  canSubmit,
  onResponseSubmitted
}: ReviewResponseSectionProps) {
  const { submitResponses, submitting, error } = useReviewResponses(reviewId);

  const handleSubmit = async (responses: Omit<ReviewResponse, 'id' | 'created_at' | 'updated_at'>[]) => {
    await submitResponses(responses);
    onResponseSubmitted();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {existingResponses.length > 0 ? (
        <ReviewResponseList
          responses={existingResponses}
          criteria={criteria}
        />
      ) : canSubmit ? (
        <ReviewResponseForm
          criteria={criteria}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      ) : (
        <div className="text-center py-4 text-sm text-gray-500">
          No responses available
        </div>
      )}
    </div>
  );
}