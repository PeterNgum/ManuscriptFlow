import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { ManuscriptStatus } from './ManuscriptStatus';
import type { ManuscriptWithDetails } from '../../types/manuscript';

interface ManuscriptListProps {
  manuscripts: ManuscriptWithDetails[];
}

export function ManuscriptList({ manuscripts }: ManuscriptListProps) {
  if (manuscripts.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No manuscripts</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new manuscript.</p>
        <div className="mt-6">
          <Link
            to="/manuscripts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Manuscript
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {manuscripts.map((manuscript) => (
          <li key={manuscript.id}>
            <Link to={`/manuscripts/${manuscript.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {manuscript.title}
                    </p>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>
                          Submitted on {new Date(manuscript.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ManuscriptStatus status={manuscript.status} />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}