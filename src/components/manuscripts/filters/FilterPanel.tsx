import React from 'react';
import { Filter } from 'lucide-react';
import { StatusFilter } from './StatusFilter';
import { CategoryFilter } from './CategoryFilter';
import { DateRangeFilter } from './DateRangeFilter';
import { SearchInput } from './SearchInput';
import type { ManuscriptFilters } from '../../../types/manuscript';

interface FilterPanelProps {
  filters: ManuscriptFilters;
  onFilterChange: (filters: Partial<ManuscriptFilters>) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
      </div>

      <div className="space-y-4">
        <SearchInput
          value={filters.searchQuery}
          onChange={(value) => onFilterChange({ searchQuery: value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusFilter
            value={filters.status}
            onChange={(value) => onFilterChange({ status: value })}
          />
          
          <CategoryFilter
            selectedCategories={filters.categories}
            onChange={(value) => onFilterChange({ categories: value })}
          />

          <DateRangeFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={(start, end) => onFilterChange({ 
              startDate: start, 
              endDate: end 
            })}
          />
        </div>
      </div>
    </div>
  );
}