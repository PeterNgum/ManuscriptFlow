import React from 'react';
import type { ReviewRoundStatus as Status } from '../../types/reviewRound';

interface ReviewRoundStatusProps {
  status: Status;
}

export function ReviewRoundStatus({ status }: ReviewRoundStatusProps) {
  const getStatusColor = (status: Status) => {
    return status === 'in_progress'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';
  };

  const formatStatus = (status: Status) => {
    return status === 'in_progress' ? 'In Progress' : 'Completed';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {formatStatus(status)}
    </span>
  );
}