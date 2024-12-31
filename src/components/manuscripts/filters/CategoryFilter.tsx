import React from 'react';
import { CATEGORY_LABELS } from '../../../constants/categories';

interface CategoryFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onChange }: CategoryFilterProps) {
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(newCategories);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Categories
      </label>
      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <button
            key={value}
            onClick={() => toggleCategory(value)}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${selectedCategories.includes(value)
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}