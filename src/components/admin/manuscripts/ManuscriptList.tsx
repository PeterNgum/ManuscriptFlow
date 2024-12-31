import React from 'react';
import { ManuscriptListItem } from './ManuscriptListItem';
import type { Database } from '../../../types/database';

type ManuscriptWithAuthor = Database['public']['Tables']['manuscripts']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'];
};

interface ManuscriptListProps {
  manuscripts: ManuscriptWithAuthor[];
}

export function ManuscriptList({ manuscripts }: ManuscriptListProps) {
  if (manuscripts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">No manuscripts found</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {manuscripts.map((manuscript) => (
          <li key={manuscript.id}>
            <ManuscriptListItem manuscript={manuscript} />
          </li>
        ))}
      </ul>
    </div>
  );
}