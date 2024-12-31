import React from 'react';
import { ReviewListItem } from './ReviewListItem';
import type { ReviewWithReviewer } from '../../types/review';

interface ReviewListProps {
  reviews: ReviewWithReviewer[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">No reviews available</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {reviews.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </div>
  );
}