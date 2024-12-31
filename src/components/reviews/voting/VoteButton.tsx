import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteButtonProps {
  value: number;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function VoteButton({ value, selected, onClick, disabled = false }: VoteButtonProps) {
  const Icon = value === 1 ? ThumbsUp : ThumbsDown;
  const baseClasses = 'flex items-center p-2 rounded-md';
  const colorClasses = selected
    ? value === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}