import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ReviewerList } from './ReviewerList';
import { ReviewerFilters } from './ReviewerFilters';
import { useReviewerFilters } from '../../../hooks/useReviewerFilters';
import type { Profile } from '../../../types/profile';

interface ReviewerAssignmentPanelProps {
  reviewers: Profile[];
  onAssign: (reviewerId: string) => Promise<void>;
  loading?: boolean;
}

export function ReviewerAssignmentPanel({ 
  reviewers, 
  onAssign, 
  loading = false 
}: ReviewerAssignmentPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedExpertise, setSelectedExpertise, filterReviewers } = useReviewerFilters();

  const filteredReviewers = filterReviewers(reviewers, searchQuery);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviewers..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <ReviewerFilters
          selectedExpertise={selectedExpertise}
          onExpertiseChange={setSelectedExpertise}
        />
      </div>

      <ReviewerList
        reviewers={filteredReviewers}
        onAssign={onAssign}
        loading={loading}
      />
    </div>
  );
}