import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDashboardActions } from '../hooks/useDashboardActions';
import { DashboardWelcome } from '../components/dashboard/DashboardWelcome';
import { DashboardAction } from '../components/dashboard/DashboardAction';
import { EmptyDashboard } from '../components/dashboard/EmptyDashboard';

export function Home() {
  const { user } = useAuth();
  const actions = useDashboardActions(user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DashboardWelcome userName={user?.firstName || 'Guest'} />

      {actions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {actions.map((action) => (
            <DashboardAction key={action.to} {...action} />
          ))}
        </div>
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}