import React from 'react';
import { TemplateListItem } from './TemplateListItem';
import type { ReviewTemplateWithCriteria } from '../../../types/reviewTemplate';

interface TemplateListProps {
  templates: ReviewTemplateWithCriteria[];
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
    <div className="space-y-4">
      {templates.map((template) => (
        <TemplateListItem
          key={template.id}
          template={template}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}