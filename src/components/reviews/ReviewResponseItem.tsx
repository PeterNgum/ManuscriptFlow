import React from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import type { ReviewResponse } from '../../types/reviewResponse';
import type { ReviewCriteria } from '../../types/reviewTemplate';

interface ReviewResponseItemProps {
  criterion: ReviewCriteria;
  response?: ReviewResponse;
}

export function ReviewResponseItem({ criterion, response }: ReviewResponseItemProps) {
  const renderResponse = () => {
    if (!response) return null;

    switch (criterion.response_type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {Array.from({ length: response.rating_value || 0 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
        );

      case 'text':
        return (
          <p className="text-gray-700 whitespace-pre-wrap">
            {response.text_value}
          </p>
        );

      case 'boolean':
        return response.boolean_value ? (
          <div className="flex items-center text-green-600">
            <ThumbsUp className="h-5 w-5 mr-1" />
            <span>Yes</span>
          </div>
        ) : (
          <div className="flex items-center text-red-600">
            <ThumbsDown className="h-5 w-5 mr-1" />
            <span>No</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-1">
        {criterion.question}
      </h4>
      {criterion.description && (
        <p className="text-sm text-gray-500 mb-2">
          {criterion.description}
        </p>
      )}
      <div className="mt-2">
        {renderResponse()}
      </div>
    </div>
  );
}