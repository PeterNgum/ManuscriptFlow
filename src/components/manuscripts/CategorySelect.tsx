import React from 'react';
import { CATEGORY_LABELS } from '../../types/categories';
import type { ResearchPillar, DataDomain, AiMlCategory } from '../../types/categories';

interface CategorySelectProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}

export function CategorySelect({ label, value, options, onChange, required }: CategorySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {CATEGORY_LABELS[option]}
          </option>
        ))}
      </select>
    </div>
  );
}