import React from 'react';
import type { Database } from '../../../types/database';

type Status = Database['public']['Tables']['manuscripts']['Row']['status'];

interface ManuscriptFiltersProps {
  selectedStatus: Status | 'all';
  onStatusChange: (status: Status | 'all') => void;
}

export function ManuscriptFilters({ selectedStatus, onStatusChange }: ManuscriptFiltersProps) {
  const statuses: Array<Status | 'all'> = [
    'all',
    'draft',
    'submitted',
    'in_review',
    'revision_requested',
    'approved',
    'rejected'
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">Filter by status:</span>
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as Status | 'all')}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}