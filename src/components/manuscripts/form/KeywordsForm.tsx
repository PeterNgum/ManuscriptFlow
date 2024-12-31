import React, { useState } from 'react';
import { X } from 'lucide-react';

interface KeywordsFormProps {
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
}

export function KeywordsForm({ keywords, onKeywordsChange }: KeywordsFormProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!keywords.includes(input.trim())) {
        onKeywordsChange([...keywords, input.trim()]);
      }
      setInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(keywords.filter(k => k !== keyword));
  };

  return (
    <div className="space-y-2">
      <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
        Keywords
      </label>
      <input
        type="text"
        id="keywords"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Press Enter to add"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}