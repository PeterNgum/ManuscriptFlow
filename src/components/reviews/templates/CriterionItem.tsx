import React from 'react';
import type { ReviewCriteria } from '../../../types/reviewTemplate';

interface CriterionItemProps {
  criterion: ReviewCriteria;
}

export function CriterionItem({ criterion }: CriterionItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {criterion.question}
            {criterion.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </h4>
          {criterion.description && (
            <p className="mt-1 text-sm text-gray-500">{criterion.description}</p>
          )}
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {formatResponseType(criterion.response_type)}
        </span>
      </div>
    </div>
  );
}

function formatResponseType(type: string): string {
  switch (type) {
    case 'rating':
      return 'Rating (1-5)';
    case 'text':
      return 'Text Response';
    case 'boolean':
      return 'Yes/No';
    default:
      return type;
  }
}