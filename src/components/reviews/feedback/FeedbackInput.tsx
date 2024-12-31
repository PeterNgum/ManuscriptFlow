import React from 'react';

interface FeedbackInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export function FeedbackInput({
  value,
  onChange,
  disabled = false,
  required = true
}: FeedbackInputProps) {
  return (
    <div>
      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
        Feedback {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id="feedback"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter your feedback..."
      />
    </div>
  );
}