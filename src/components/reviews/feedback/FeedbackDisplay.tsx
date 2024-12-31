import React from 'react';

interface FeedbackDisplayProps {
  feedback: string;
  className?: string;
}

export function FeedbackDisplay({ feedback, className = '' }: FeedbackDisplayProps) {
  if (!feedback) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-sm font-medium text-gray-900">Feedback</h4>
      <p className="text-sm text-gray-600 whitespace-pre-wrap">{feedback}</p>
    </div>
  );
}