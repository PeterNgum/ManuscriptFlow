import React from 'react';
import type { ReviewCriteria } from '../../../types/reviewTemplate';
import type { ReviewResponse } from '../../../types/reviewResponse';

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
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-900">
              {response.rating_value}/5
            </span>
          </div>
        );
      case 'text':
        return (
          <p className="text-gray-700 whitespace-pre-wrap">
            {response.text_value}
          </p>
        );
      case 'boolean':
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            response.boolean_value
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {response.boolean_value ? 'Yes' : 'No'}
          </span>
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