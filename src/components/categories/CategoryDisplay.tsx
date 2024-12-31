import React from 'react';
import { getCategoryLabel } from '../../utils/categoryUtils';
import type { ResearchPillar, DataDomain, AiMlCategory } from '../../types/categoryTypes';

interface CategoryDisplayProps {
  primaryCategory: string;
  categoryType: 'research_pillar' | 'data_domain' | 'ai_ml';
  secondaryCategories?: string[];
  className?: string;
}

export function CategoryDisplay({ 
  primaryCategory,
  categoryType,
  secondaryCategories = [],
  className = ''
}: CategoryDisplayProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const colorClasses = {
    research_pillar: 'bg-blue-100 text-blue-800',
    data_domain: 'bg-green-100 text-green-800',
    ai_ml: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <span className={`${baseClasses} ${colorClasses[categoryType]}`}>
        {getCategoryLabel(primaryCategory)}
      </span>
      {secondaryCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {secondaryCategories.map((category) => (
            <span
              key={category}
              className={`${baseClasses} bg-gray-100 text-gray-800`}
            >
              {getCategoryLabel(category)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}