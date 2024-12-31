import React from 'react';

interface TitleAbstractFormProps {
  title: string;
  abstract: string;
  onTitleChange: (value: string) => void;
  onAbstractChange: (value: string) => void;
}

export function TitleAbstractForm({
  title,
  abstract,
  onTitleChange,
  onAbstractChange
}: TitleAbstractFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">
          Abstract
        </label>
        <textarea
          id="abstract"
          rows={4}
          value={abstract}
          onChange={(e) => onAbstractChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}