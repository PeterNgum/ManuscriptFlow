import React from 'react';
import { Clock, User } from 'lucide-react';
import { ManuscriptStatus } from '../ManuscriptStatus';
import { CategoryDisplay } from '../../categories/CategoryDisplay';
import type { Database } from '../../../types/database';

type ManuscriptWithAuthor = Database['public']['Tables']['manuscripts']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'];
};

interface ManuscriptHeaderProps {
  manuscript: ManuscriptWithAuthor;
}

export function ManuscriptHeader({ manuscript }: ManuscriptHeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {manuscript.title}
          </h1>
          <ManuscriptStatus status={manuscript.status} />
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <User className="h-4 w-4 mr-1" />
          <span>
            {manuscript.author.first_name} {manuscript.author.last_name}
          </span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {new Date(manuscript.created_at).toLocaleDateString()}
          </span>
        </div>

        {manuscript.abstract && (
          <p className="mt-4 text-gray-600">
            {manuscript.abstract}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {manuscript.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {manuscript.primary_research_pillar && (
            <CategoryDisplay
              primaryCategory={manuscript.primary_research_pillar}
              categoryType="research_pillar"
            />
          )}
          {manuscript.primary_data_domain && (
            <CategoryDisplay
              primaryCategory={manuscript.primary_data_domain}
              categoryType="data_domain"
            />
          )}
          {manuscript.primary_ai_ml_category && (
            <CategoryDisplay
              primaryCategory={manuscript.primary_ai_ml_category}
              categoryType="ai_ml"
            />
          )}
        </div>
      </div>
    </div>
  );
}