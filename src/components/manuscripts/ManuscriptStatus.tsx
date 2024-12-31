import React from 'react';
import type { Database } from '../../types/database';

type Status = Database['public']['Tables']['manuscripts']['Row']['status'];

interface ManuscriptStatusProps {
  status: Status;
}

export function ManuscriptStatus({ status }: ManuscriptStatusProps) {
  const getStatusColor = (status: Status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      revision_requested: 'bg-orange-100 text-orange-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const formatStatus = (status: Status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {formatStatus(status)}
    </span>
  );
}