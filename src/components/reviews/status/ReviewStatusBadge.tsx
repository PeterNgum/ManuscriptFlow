import React from 'react';
import { getReviewStatusColor } from '../../../utils/review';
import type { ReviewStatus } from '../../../types/review';

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  const statusText = status === 'completed' ? 'Completed' : 'Pending';
  const colorClasses = getReviewStatusColor(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {statusText}
    </span>
  );
}