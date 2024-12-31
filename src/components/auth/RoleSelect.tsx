import React from 'react';
import { UserCog } from 'lucide-react';

interface RoleSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UserCog className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a role</option>
          <option value="author">Author</option>
          <option value="reviewer">Reviewer</option>
        </select>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}