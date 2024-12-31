import { useState, useCallback } from 'react';
import type { Profile } from '../types/profile';

export function useReviewerFilters() {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  const filterReviewers = useCallback((
    reviewers: Profile[],
    searchQuery: string
  ) => {
    return reviewers.filter(reviewer => {
      // Filter by search query
      const searchMatch = !searchQuery || [
        reviewer.first_name,
        reviewer.last_name,
        reviewer.organization,
        ...reviewer.expertise_areas
      ].some(field => 
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter by expertise
      const expertiseMatch = selectedExpertise.length === 0 || 
        selectedExpertise.some(expertise => 
          reviewer.expertise_areas.includes(expertise)
        );

      return searchMatch && expertiseMatch;
    });
  }, [selectedExpertise]);

  return {
    selectedExpertise,
    setSelectedExpertise,
    filterReviewers
  };
}