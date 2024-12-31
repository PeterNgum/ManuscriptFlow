import React from 'react';

interface ReviewFeedbackProps {
  feedback: string;
  onFeedbackChange: (feedback: string) => void;
}

export function ReviewFeedback({ feedback, onFeedbackChange }: ReviewFeedbackProps) {
  return (
    <div>
      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
        Feedback
      </label>
      <textarea
        id="feedback"
        rows={4}
        value={feedback}
        onChange={(e) => onFeedbackChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
  );
}