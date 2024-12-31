import React from 'react';

interface DashboardWelcomeProps {
  userName: string;
}

export function DashboardWelcome({ userName }: DashboardWelcomeProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Welcome, {userName}!
      </h1>
      <p className="mt-3 text-xl text-gray-500">
        What would you like to do today?
      </p>
    </div>
  );
}