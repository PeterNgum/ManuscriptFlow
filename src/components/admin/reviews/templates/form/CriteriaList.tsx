import React from 'react';
import { Trash2 } from 'lucide-react';
import type { NewReviewTemplate } from '../../../../../types/reviewTemplate';

interface CriteriaListProps {
  criteria: NewReviewTemplate['criteria'];
  onRemove: (index: number) => void;
}

export function CriteriaList({ criteria, onRemove }: CriteriaListProps) {
  if (criteria.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No criteria added yet
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {criteria.map((criterion, index) => (
        <li key={index} className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {criterion.question}
              </h4>
              {criterion.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {criterion.description}
                </p>
              )}
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <span>Type: {criterion.responseType}</span>
                <span>{criterion.required ? 'Required' : 'Optional'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}