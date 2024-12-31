import React from 'react';
import { VoteButton } from './VoteButton';

interface VoteSelectorProps {
  value: number | null;
  onChange: (vote: number) => void;
  disabled?: boolean;
}

export function VoteSelector({ value, onChange, disabled = false }: VoteSelectorProps) {
  return (
    <div className="flex space-x-4">
      <VoteButton
        value={1}
        selected={value === 1}
        onClick={() => onChange(1)}
        disabled={disabled}
      />
      <VoteButton
        value={-1}
        selected={value === -1}
        onClick={() => onChange(-1)}
        disabled={disabled}
      />
    </div>
  );
}