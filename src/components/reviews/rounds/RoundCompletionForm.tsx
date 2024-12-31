import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { ReviewRoundDecision } from '../../../types/reviewRound';

interface RoundCompletionFormProps {
  onSubmit: (decision: ReviewRoundDecision, notes: string) => Promise<void>;
  submitting?: boolean;
}

export function RoundCompletionForm({ onSubmit, submitting = false }: RoundCompletionFormProps) {
  const [decision, setDecision] = useState<ReviewRoundDecision>('accept');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    try {
      await onSubmit(decision, notes);
    } catch (err) {
      setError('Failed to submit decision');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Decision</label>
        <select
          value={decision}
          onChange={(e) => setDecision(e.target.value as ReviewRoundDecision)}
          disabled={submitting}
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
          disabled={submitting}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Provide any additional notes or feedback..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Decision'}
        </button>
      </div>
    </form>
  );
}