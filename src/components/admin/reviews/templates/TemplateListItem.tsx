import React from 'react';
import { Switch } from '../../../shared/Switch';
import type { ReviewTemplate, ReviewCriteria } from '../../../../types/reviewTemplate';

interface TemplateListItemProps {
  template: ReviewTemplate & { criteria: ReviewCriteria[] };
  onToggleActive: (id: string, isActive: boolean) => Promise<void>;
}

export function TemplateListItem({ template, onToggleActive }: TemplateListItemProps) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
          {template.description && (
            <p className="mt-1 text-sm text-gray-500">{template.description}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {template.criteria.length} criteria
          </p>
        </div>
        <Switch
          checked={template.is_active}
          onChange={(checked) => onToggleActive(template.id, checked)}
          label="Active"
        />
      </div>
    </div>
  );
}