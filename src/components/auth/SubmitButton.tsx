import React from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface SubmitButtonProps {
  loading: boolean;
  text: string;
}

export function SubmitButton({ loading, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {loading ? (
        <LoadingSpinner size="sm" className="text-white" />
      ) : (
        text
      )}
    </button>
  );
}