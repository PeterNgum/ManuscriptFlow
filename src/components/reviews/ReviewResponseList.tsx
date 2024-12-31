import React from 'react';
import { ReviewResponseItem } from './ReviewResponseItem';
import type { ReviewResponse } from '../../types/reviewResponse';
import type { ReviewCriteria } from '../../types/reviewTemplate';

interface ReviewResponseListProps {
  responses: ReviewResponse[];
  criteria: ReviewCriteria[];
}

export function ReviewResponseList({ responses, criteria }: ReviewResponseListProps) {
  return (
    <div className="space-y-4">
      {criteria.map((criterion) => {
        const response = responses.find(r => r.criteria_id === criterion.id);
        return (
          <ReviewResponseItem
            key={criterion.id}
            criterion={criterion}
            response={response}
          />
        );
      })}
    </div>
  );
}