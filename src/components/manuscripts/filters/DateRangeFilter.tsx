import React from 'react';

interface DateRangeFilterProps {
  startDate: string | null;
  endDate: string | null;
  onChange: (startDate: string | null, endDate: string | null) => void;
}

export function DateRangeFilter({ startDate, endDate, onChange }: DateRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Date Range
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => onChange(e.target.value || null, endDate)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => onChange(startDate, e.target.value || null)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
    </div>
  );
}