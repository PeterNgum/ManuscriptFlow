import React from 'react';
import { ReviewListItem } from '../reviews/ReviewListItem';
import { ReviewForm } from '../reviews/ReviewForm';
import type { Database } from '../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'] & {
  reviewer: Database['public']['Tables']['profiles']['Row'];
};

interface ReviewSectionProps {
  reviews: Review[];
  canReview: boolean;
  onReviewSubmit: (feedback: string, vote: number) => Promise<void>;
}

export function ReviewSection({ reviews, canReview, onReviewSubmit }: ReviewSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
        {reviews.length === 0 && (
          <p className="p-4 text-sm text-gray-500 text-center">
            No reviews yet
          </p>
        )}
      </div>
      {canReview && (
        <ReviewForm onSubmit={onReviewSubmit} />
      )}
    </div>
  );
}