import React from 'react';

interface BooleanInputProps {
  value?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function BooleanInput({ value, onChange, disabled = false }: BooleanInputProps) {
  return (
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => onChange(true)}
        disabled={disabled}
        className={`px-3 py-1 rounded-md ${
          value === true
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        disabled={disabled}
        className={`px-3 py-1 rounded-md ${
          value === false
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        No
      </button>
    </div>
  );
}