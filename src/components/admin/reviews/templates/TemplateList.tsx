import React from 'react';
import { TemplateListItem } from './TemplateListItem';
import type { ReviewTemplate, ReviewCriteria } from '../../../../types/reviewTemplate';

interface TemplateListProps {
  templates: Array<ReviewTemplate & { criteria: ReviewCriteria[] }>;
  onToggleActive: (id: string, isActive: boolean) => Promise<void>;
}

export function TemplateList({ templates, onToggleActive }: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">No review templates found</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {templates.map((template) => (
          <li key={template.id}>
            <TemplateListItem template={template} onToggleActive={onToggleActive} />
          </li>
        ))}
      </ul>
    </div>
  );
}