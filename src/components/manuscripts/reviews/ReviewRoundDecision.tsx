import React, { useState } from 'react';
import type { ReviewRoundDecision as Decision } from '../../../types/reviewRound';

interface ReviewRoundDecisionProps {
  onSubmit: (decision: Decision, notes?: string) => Promise<void>;
  disabled?: boolean;
}

export function ReviewRoundDecision({ onSubmit, disabled }: ReviewRoundDecisionProps) {
  const [decision, setDecision] = useState<Decision>('accept');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || disabled) return;

    setSubmitting(true);
    try {
      await onSubmit(decision, notes);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Decision</label>
        <select
          value={decision}
          onChange={(e) => setDecision(e.target.value as Decision)}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="accept">Accept</option>
          <option value="reject">Reject</option>
          <option value="revise">Request Revision</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={disabled}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled || submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Decision'}
        </button>
      </div>
    </form>
  );
}