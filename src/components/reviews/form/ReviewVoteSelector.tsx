import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ReviewVote } from '../../../types/review';

interface ReviewVoteSelectorProps {
  selectedVote: number | null;
  onVoteSelect: (vote: number) => void;
}

export function ReviewVoteSelector({ selectedVote, onVoteSelect }: ReviewVoteSelectorProps) {
  const votes: ReviewVote[] = [
    { value: 1, label: 'Approve', icon: 'thumbs-up' },
    { value: -1, label: 'Reject', icon: 'thumbs-down' }
  ];

  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-2">Vote</span>
      <div className="flex space-x-4">
        {votes.map(({ value, label, icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onVoteSelect(value)}
            className={`flex items-center p-2 rounded-md ${
              selectedVote === value 
                ? value === 1 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {icon === 'thumbs-up' ? (
              <ThumbsUp className="h-5 w-5 mr-2" />
            ) : (
              <ThumbsDown className="h-5 w-5 mr-2" />
            )}
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}