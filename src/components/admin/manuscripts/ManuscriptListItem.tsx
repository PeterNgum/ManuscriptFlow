import React from 'react';
import { Link } from 'react-router-dom';
import { ManuscriptStatus } from '../../manuscripts/ManuscriptStatus';
import type { ManuscriptWithAuthor } from '../../../types/manuscript';

interface ManuscriptListItemProps {
  manuscript: ManuscriptWithAuthor;
}

export function ManuscriptListItem({ manuscript }: ManuscriptListItemProps) {
  return (
    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <Link 
            to={`/admin/manuscripts/${manuscript.id}`}
            className="text-lg font-medium text-indigo-600 hover:text-indigo-900 truncate"
          >
            {manuscript.title}
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            By {manuscript.author.first_name} {manuscript.author.last_name}
          </p>
        </div>
        <div className="ml-4 flex items-center space-x-4">
          <ManuscriptStatus status={manuscript.status} />
          <Link
            to={`/admin/manuscripts/${manuscript.id}/reviewers`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Manage Reviewers
          </Link>
        </div>
      </div>
    </div>
  );
}