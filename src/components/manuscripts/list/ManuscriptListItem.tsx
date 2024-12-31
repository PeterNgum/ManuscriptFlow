import React from 'react';
import { Link } from 'react-router-dom';
import { ManuscriptStatus } from '../ManuscriptStatus';
import { CategoryDisplay } from '../../categories/CategoryDisplay';
import type { Database } from '../../../types/database';

type Manuscript = Database['public']['Tables']['manuscripts']['Row'];

interface ManuscriptListItemProps {
  manuscript: Manuscript;
}

export function ManuscriptListItem({ manuscript }: ManuscriptListItemProps) {
  return (
    <Link to={`/manuscripts/${manuscript.id}`} className="block hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {manuscript.title}
          </h3>
          <ManuscriptStatus status={manuscript.status} />
        </div>
        <div className="mt-2">
          {manuscript.abstract && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {manuscript.abstract}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {manuscript.keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2">
          {manuscript.primary_research_pillar && (
            <CategoryDisplay
              primaryCategory={manuscript.primary_research_pillar}
              categoryType="research_pillar"
              className="mr-2"
            />
          )}
          {manuscript.primary_data_domain && (
            <CategoryDisplay
              primaryCategory={manuscript.primary_data_domain}
              categoryType="data_domain"
              className="mr-2"
            />
          )}
        </div>
      </div>
    </Link>
  );
}