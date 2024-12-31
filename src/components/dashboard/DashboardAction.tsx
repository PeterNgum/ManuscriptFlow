import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface DashboardActionProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function DashboardAction({ to, icon: Icon, title, description, color }: DashboardActionProps) {
  return (
    <Link
      to={to}
      className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className={`inline-flex p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
      <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-200 group-hover:ring-gray-300" />
    </Link>
  );
}