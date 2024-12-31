import React from 'react';
import { CriterionItem } from './CriterionItem';
import type { ReviewCriteria } from '../../../types/reviewTemplate';

interface CriteriaListProps {
  criteria: ReviewCriteria[];
}

export function CriteriaList({ criteria }: CriteriaListProps) {
  if (criteria.length === 0) {
    return (
      <p className="text-sm text-gray-500">No criteria defined</p>
    );
  }

  return (
    <div className="space-y-4">
      {criteria.map((criterion) => (
        <CriterionItem key={criterion.id} criterion={criterion} />
      ))}
    </div>
  );
}