import React from 'react';
import { CategorySelect } from '../../categories/CategorySelect';
import type { ResearchPillar, DataDomain, AiMlCategory } from '../../../types/categoryTypes';

interface ManuscriptCategoriesFormProps {
  diseaseAreaId: string;
  diseaseAreas: Array<{ id: string; name: string }>;
  primaryResearchPillar: ResearchPillar | null;
  primaryDataDomain: DataDomain | null;
  primaryAiMlCategory: AiMlCategory | null;
  onDiseaseAreaChange: (id: string) => void;
  onResearchPillarChange: (pillar: ResearchPillar) => void;
  onDataDomainChange: (domain: DataDomain) => void;
  onAiMlCategoryChange: (category: AiMlCategory) => void;
}

export function ManuscriptCategoriesForm({
  diseaseAreaId,
  diseaseAreas,
  primaryResearchPillar,
  primaryDataDomain,
  primaryAiMlCategory,
  onDiseaseAreaChange,
  onResearchPillarChange,
  onDataDomainChange,
  onAiMlCategoryChange
}: ManuscriptCategoriesFormProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Disease Area
        </label>
        <select
          value={diseaseAreaId}
          onChange={(e) => onDiseaseAreaChange(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Disease Area</option>
          {diseaseAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <CategorySelect
        label="Primary Research Pillar"
        value={primaryResearchPillar}
        options={[
          'data_management',
          'model_development',
          'responsible_ai',
          'model_evaluation',
          'model_deployment'
        ]}
        onChange={(value) => onResearchPillarChange(value as ResearchPillar)}
        required
      />

      <CategorySelect
        label="Primary Data Domain"
        value={primaryDataDomain}
        options={[
          'imaging',
          'biomarkers',
          'ehr',
          'wearable',
          'genomics',
          'temporal'
        ]}
        onChange={(value) => onDataDomainChange(value as DataDomain)}
        required
      />

      <CategorySelect
        label="Primary AI/ML Category"
        value={primaryAiMlCategory}
        options={[
          'supervised_learning',
          'unsupervised_learning',
          'reinforcement_learning',
          'deep_learning',
          'transfer_learning',
          'explainable_ai',
          'federated_learning'
        ]}
        onChange={(value) => onAiMlCategoryChange(value as AiMlCategory)}
        required
      />
    </div>
  );
}