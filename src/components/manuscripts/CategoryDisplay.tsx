import React from 'react';
import { CATEGORY_LABELS } from '../../types/categories';
import type { ResearchPillar, DataDomain, AiMlCategory, DiseaseArea } from '../../types/categories';

interface CategoryDisplayProps {
  diseaseArea: DiseaseArea;
  primaryResearchPillar: ResearchPillar;
  primaryDataDomain: DataDomain;
  primaryAiMlCategory: AiMlCategory;
  secondaryResearchPillars?: ResearchPillar[];
  secondaryDataDomains?: DataDomain[];
  secondaryAiMlCategories?: AiMlCategory[];
}

export function CategoryDisplay({
  diseaseArea,
  primaryResearchPillar,
  primaryDataDomain,
  primaryAiMlCategory,
  secondaryResearchPillars = [],
  secondaryDataDomains = [],
  secondaryAiMlCategories = []
}: CategoryDisplayProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Disease Area</h3>
        <p className="mt-1 text-sm text-gray-900">{diseaseArea.name}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Research Pillar</h3>
        <p className="mt-1 text-sm text-gray-900">
          {CATEGORY_LABELS[primaryResearchPillar]}
        </p>
        {secondaryResearchPillars.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {secondaryResearchPillars.map((pillar) => (
              <span
                key={pillar}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {CATEGORY_LABELS[pillar]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Data Domain</h3>
        <p className="mt-1 text-sm text-gray-900">
          {CATEGORY_LABELS[primaryDataDomain]}
        </p>
        {secondaryDataDomains.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {secondaryDataDomains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {CATEGORY_LABELS[domain]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">AI/ML Category</h3>
        <p className="mt-1 text-sm text-gray-900">
          {CATEGORY_LABELS[primaryAiMlCategory]}
        </p>
        {secondaryAiMlCategories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {secondaryAiMlCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {CATEGORY_LABELS[category]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}