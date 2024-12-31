import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import type { Database } from '../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'] & {
  reviewer: Database['public']['Tables']['profiles']['Row'];
};

interface ReviewListItemProps {
  review: Review;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  const getVoteIcon = (vote: number | null) => {
    if (vote === 1) return <ThumbsUp className="h-5 w-5 text-green-500" />;
    if (vote === -1) return <ThumbsDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="p-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {review.reviewer.first_name} {review.reviewer.last_name}
          </h4>
          <p className="text-sm text-gray-500">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">Vote:</span>
          {getVoteIcon(review.vote)}
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