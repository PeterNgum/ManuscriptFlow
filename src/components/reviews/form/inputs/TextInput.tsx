import React from 'react';

interface TextInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TextInput({ value = '', onChange, disabled = false }: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={3}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}