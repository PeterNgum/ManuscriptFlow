import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (feedback: string, vote: number) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [feedback, setFeedback] = useState('');
  const [vote, setVote] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vote === null) {
      setError('Please select a vote');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit(feedback, vote);
      setFeedback('');
      setVote(null);
    } catch (err) {
      setError('Failed to submit review');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      {error && (
        <div className="mb-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
          Feedback
        </label>
        <textarea
          id="feedback"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700 mb-2">Vote</span>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setVote(1)}
            className={`p-2 rounded-md ${
              vote === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <ThumbsUp className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setVote(-1)}
            className={`p-2 rounded-md ${
              vote === -1 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <ThumbsDown className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}