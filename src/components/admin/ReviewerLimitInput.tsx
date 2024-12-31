import React, { useState } from 'react';

interface ReviewerLimitInputProps {
  currentLimit: number;
  onUpdate: (limit: number) => Promise<void>;
}

export function ReviewerLimitInput({ currentLimit, onUpdate }: ReviewerLimitInputProps) {
  const [limit, setLimit] = useState(currentLimit);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await onUpdate(limit);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="reviewer-limit" className="text-sm font-medium text-gray-700">
        Reviewer Limit:
      </label>
      <input
        type="number"
        id="reviewer-limit"
        min="1"
        max="10"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <button
        onClick={handleUpdate}
        disabled={updating || limit === currentLimit}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {updating ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}