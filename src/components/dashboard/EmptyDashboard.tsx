import React from 'react';

export function EmptyDashboard() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">
        No available actions. Please contact an administrator if you believe this is an error.
      </p>
    </div>
  );
}