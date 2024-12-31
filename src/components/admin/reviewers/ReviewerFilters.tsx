import React from 'react';
import { Filter } from 'lucide-react';

interface ReviewerFiltersProps {
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
}

export function ReviewerFilters({ selectedExpertise, onExpertiseChange }: ReviewerFiltersProps) {
  const commonExpertise = [
    'Clinical Research',
    'Data Science',
    'Machine Learning',
    'Medical Imaging',
    'Bioinformatics'
  ];

  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      onExpertiseChange(selectedExpertise.filter(e => e !== expertise));
    } else {
      onExpertiseChange([...selectedExpertise, expertise]);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-5 w-5 text-gray-400" />
      <div className="flex flex-wrap gap-2">
        {commonExpertise.map((expertise) => (
          <button
            key={expertise}
            onClick={() => toggleExpertise(expertise)}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${selectedExpertise.includes(expertise)
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {expertise}
          </button>
        ))}
      </div>
    </div>
  );
}