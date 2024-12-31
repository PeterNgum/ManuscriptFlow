import React from 'react';
import { getReviewStatusColor, formatReviewStatus } from '../../utils/review';
import type { ReviewStatus as Status } from '../../types/review';

interface ReviewStatusProps {
  status: Status;
}

export function ReviewStatus({ status }: ReviewStatusProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReviewStatusColor(status)}`}>
      {formatReviewStatus(status)}
    </span>
  );
}