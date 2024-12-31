import React from 'react';
import type { ManuscriptStatus } from '../../../types/manuscript';

interface StatusFilterProps {
  value: ManuscriptStatus | 'all';
  onChange: (status: ManuscriptStatus | 'all') => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const statuses: Array<ManuscriptStatus | 'all'> = [
    'all',
    'draft',
    'submitted',
    'in_review',
    'revision_requested',
    'approved',
    'rejected'
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ManuscriptStatus | 'all')}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status === 'all' 
              ? 'All Statuses' 
              : status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            }
          </option>
        ))}
      </select>
    </div>
  );
}