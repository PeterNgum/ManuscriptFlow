import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { formatVote } from '../../utils/review';

interface ReviewVoteProps {
  vote: number | null;
}

export function ReviewVote({ vote }: ReviewVoteProps) {
  const getVoteIcon = () => {
    if (vote === 1) return <ThumbsUp className="h-5 w-5 text-green-500" />;
    if (vote === -1) return <ThumbsDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm text-gray-500">Vote:</span>
      <div className="flex items-center">
        {getVoteIcon()}
        <span className="ml-2 text-sm text-gray-700">{formatVote(vote)}</span>
      </div>
    </div>
  );
}