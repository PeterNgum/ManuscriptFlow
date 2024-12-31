```typescript
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ReviewResponse } from '../../types/reviewResponse';

interface ReviewSubmissionFormProps {
  onSubmit: (data: ReviewResponse) => Promise<void>;
  criteria: Array<{
    id: string;
    question: string;
    responseType: 'rating' | 'text' | 'boolean';
    required: boolean;
  }>;
}

export function ReviewSubmissionForm({ onSubmit, criteria }: ReviewSubmissionFormProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
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

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        responses: Object.entries(responses).map(([criteriaId, value]) => ({
          criteria_id: criteriaId,
          ...value
        }))
      });
    } catch (err) {
      setError('Failed to submit review');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderResponseInput = (criterion: typeof criteria[0]) => {
    switch (criterion.responseType) {
      case 'rating':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setResponses(prev => ({
                  ...prev,
                  [criterion.id]: { rating_value: rating }
                }))}
                className={`p-2 rounded-md ${
                  responses[criterion.id]?.rating_value === rating
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={responses[criterion.id]?.text_value || ''}
            onChange={(e) => setResponses(prev => ({
              ...prev,
              [criterion.id]: { text_value: e.target.value }
            }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );

      case 'boolean':
        return (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setResponses(prev => ({
                ...prev,
                [criterion.id]: { boolean_value: true }
              }))}
              className={`flex items-center p-2 rounded-md ${
                responses[criterion.id]?.boolean_value === true
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <ThumbsUp className="h-5 w-5 mr-1" />
              Yes
            </button>
            <button
              type="button"
              onClick={() => setResponses(prev => ({
                ...prev,
                [criterion.id]: { boolean_value: false }
              }))}
              className={`flex items-center p-2 rounded-md ${
                responses[criterion.id]?.boolean_value === false
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <ThumbsDown className="h-5 w-5 mr-1" />
              No
            </button>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {criteria.map((criterion) => (
        <div key={criterion.id} className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700">
            {criterion.question}
            {criterion.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="mt-2">
            {renderResponseInput(criterion)}
          </div>
        </div>
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
```