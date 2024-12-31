import React from 'react';
import { getRoundStatusColor, formatRoundStatus } from '../../../utils/review';
import type { ReviewRoundStatus as Status } from '../../../types/reviewRound';

interface ReviewRoundStatusProps {
  status: Status;
}

export function ReviewRoundStatus({ status }: ReviewRoundStatusProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoundStatusColor(status)}`}>
      {formatRoundStatus(status)}
    </span>
  );
}