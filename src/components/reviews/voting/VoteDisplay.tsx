import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface VoteDisplayProps {
  vote: number | null;
  showLabel?: boolean;
}

export function VoteDisplay({ vote, showLabel = false }: VoteDisplayProps) {
  const getVoteIcon = () => {
    if (vote === 1) return <ThumbsUp className="h-5 w-5 text-green-500" />;
    if (vote === -1) return <ThumbsDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  const getVoteLabel = () => {
    if (vote === 1) return 'Approved';
    if (vote === -1) return 'Rejected';
    return 'No vote';
  };

  return (
    <div className="flex items-center">
      {getVoteIcon()}
      {showLabel && (
        <span className="ml-2 text-sm text-gray-700">{getVoteLabel()}</span>
      )}
    </div>
  );
}