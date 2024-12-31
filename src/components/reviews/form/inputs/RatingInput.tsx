import React from 'react';

interface RatingInputProps {
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingInput({ value, onChange, disabled = false }: RatingInputProps) {
  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          disabled={disabled}
          className={`w-8 h-8 rounded-full ${
            value === rating
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}