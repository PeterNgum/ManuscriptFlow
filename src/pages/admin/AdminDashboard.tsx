import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Settings, TrendingUp } from 'lucide-react';
import { AdminStats } from '../../components/admin/AdminStats';
import { RecentActivity } from '../../components/admin/RecentActivity';

export function AdminDashboard() {
  const actions = [
    {
      name: 'Manage Manuscripts',
      description: 'Review and process manuscript submissions',
      href: '/admin/manuscripts',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Manage Reviewers',
      description: 'Assign and oversee manuscript reviewers',
      href: '/admin/reviewers',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Review Templates',
      description: 'Configure review forms and criteria',
      href: '/admin/review-templates',
      icon: Settings,
      color: 'bg-purple-500'
    },
    {
      name: 'Analytics',
      description: 'View submission and review statistics',
      href: '/admin/analytics',
      icon: TrendingUp,
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg ${action.color} bg-opacity-10`}>
              <action.icon className={`h-6 w-6 ${action.color} text-opacity-80`} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {action.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminStats />
        <RecentActivity />
      </div>
    </div>
  );
}