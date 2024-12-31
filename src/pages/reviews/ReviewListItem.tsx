import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText } from 'lucide-react';
import { ManuscriptStatus } from '../../components/manuscripts/ManuscriptStatus';
import type { Database } from '../../types/database';

type ReviewWithManuscript = Database['public']['Tables']['reviews']['Row'] & {
  manuscript: Database['public']['Tables']['manuscripts']['Row'];
};

interface ReviewListItemProps {
  review: ReviewWithManuscript;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <li>
      <Link 
        to={`/manuscripts/${review.manuscript_id}`}
        className="block hover:bg-gray-50"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm font-medium text-indigo-600 truncate">
                {review.manuscript.title}
              </p>
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              <ManuscriptStatus status={review.manuscript.status} />
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                {review.status === 'completed' ? 'Review completed' : 'Review pending'}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <p>
                Assigned on {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}