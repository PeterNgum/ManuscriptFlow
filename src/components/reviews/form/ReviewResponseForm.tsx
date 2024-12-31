import React, { useState } from 'react';
import { ReviewCriterionInput } from './ReviewCriterionInput';
import type { ReviewCriteria } from '../../../types/reviewTemplate';
import type { ReviewResponseInput } from '../../../types/reviewResponse';

interface ReviewResponseFormProps {
  criteria: ReviewCriteria[];
  onSubmit: (responses: ReviewResponseInput[]) => Promise<void>;
  submitting?: boolean;
}

export function ReviewResponseForm({ criteria, onSubmit, submitting = false }: ReviewResponseFormProps) {
  const [responses, setResponses] = useState<Record<string, ReviewResponseInput>>({});
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Validate required responses
    const missingRequired = criteria
      .filter(c => c.required)
      .some(c => !responses[c.id]);

    if (missingRequired) {
      setError('Please complete all required criteria');
      return;
    }

    try {
      const formattedResponses = Object.entries(responses).map(([criteriaId, response]) => ({
        criteria_id: criteriaId,
        ...response
      }));
      await onSubmit(formattedResponses);
    } catch (err) {
      setError('Failed to submit responses');
      console.error(err);
    }
  };

  const handleResponseChange = (criteriaId: string, value: ReviewResponseInput) => {
    setResponses(prev => ({
      ...prev,
      [criteriaId]: value
    }));
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {criteria.map((criterion) => (
        <ReviewCriterionInput
          key={criterion.id}
          criterion={criterion}
          value={responses[criterion.id]}
          onChange={(value) => handleResponseChange(criterion.id, value)}
          disabled={submitting}
        />
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}