import React from 'react';
import { ReviewStatus } from './ReviewStatus';
import { ReviewVote } from './ReviewVote';
import type { ReviewWithReviewer } from '../../types/review';

interface ReviewListItemProps {
  review: ReviewWithReviewer;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {review.reviewer.first_name} {review.reviewer.last_name}
          </h4>
          <p className="text-sm text-gray-500">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <ReviewStatus status={review.status} />
          {review.status === 'completed' && (
            <ReviewVote vote={review.vote} />
          )}
        </div>
      </div>
      {review.feedback && (
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {review.feedback}
        </p>
      )}
    </div>
  );
}