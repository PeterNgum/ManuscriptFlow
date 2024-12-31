import React from 'react';
import { ReviewListItem } from './ReviewListItem';
import type { Database } from '../../types/database';

type ReviewWithManuscript = Database['public']['Tables']['reviews']['Row'] & {
  manuscript: Database['public']['Tables']['manuscripts']['Row'];
};

interface ReviewListProps {
  reviews: ReviewWithManuscript[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No reviews assigned</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {reviews.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </ul>
  );
}