import React from 'react';
import { Switch } from '../../shared/Switch';
import { CriteriaList } from './CriteriaList';
import type { ReviewTemplateWithCriteria } from '../../../types/reviewTemplate';

interface TemplateListItemProps {
  template: ReviewTemplateWithCriteria;
  onToggleActive: (id: string, isActive: boolean) => Promise<void>;
}

export function TemplateListItem({ template, onToggleActive }: TemplateListItemProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
            {template.description && (
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            )}
          </div>
          <Switch
            checked={template.is_active}
            onChange={(checked) => onToggleActive(template.id, checked)}
            label="Active"
          />
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Criteria</h4>
        <CriteriaList criteria={template.criteria} />
      </div>
    </div>
  );
}