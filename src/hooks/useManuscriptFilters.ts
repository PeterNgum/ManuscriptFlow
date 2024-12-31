import { useState, useCallback } from 'react';
import type { ManuscriptFilters, Manuscript } from '../types/manuscript';

const initialFilters: ManuscriptFilters = {
  searchQuery: '',
  status: 'all',
  categories: [],
  startDate: null,
  endDate: null
};

export function useManuscriptFilters() {
  const [filters, setFilters] = useState<ManuscriptFilters>(initialFilters);

  const updateFilters = (newFilters: Partial<ManuscriptFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filterManuscripts = useCallback((manuscripts: Manuscript[]) => {
    return manuscripts.filter(manuscript => {
      // Search query filter
      if (filters.searchQuery) {
        const searchTerms = filters.searchQuery.toLowerCase().split(' ');
        const searchableText = [
          manuscript.title,
          manuscript.abstract,
          ...manuscript.keywords
        ].join(' ').toLowerCase();

        if (!searchTerms.every(term => searchableText.includes(term))) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'all' && manuscript.status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const manuscriptCategories = [
          manuscript.primary_research_pillar,
          manuscript.primary_data_domain,
          manuscript.primary_ai_ml_category
        ].filter(Boolean);

        if (!filters.categories.some(category => manuscriptCategories.includes(category))) {
          return false;
        }
      }

      // Date range filter
      const manuscriptDate = new Date(manuscript.created_at);
      if (filters.startDate && new Date(filters.startDate) > manuscriptDate) {
        return false;
      }
      if (filters.endDate && new Date(filters.endDate) < manuscriptDate) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    updateFilters,
    filterManuscripts,
    resetFilters: () => setFilters(initialFilters)
  };
}