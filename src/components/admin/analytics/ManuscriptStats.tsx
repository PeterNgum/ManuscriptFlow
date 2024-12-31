import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { ManuscriptStatistics } from '../../../types/analytics';

interface ManuscriptStatsProps {
  stats: ManuscriptStatistics;
}

export function ManuscriptStats({ stats }: ManuscriptStatsProps) {
  const items = [
    {
      label: 'Total Manuscripts',
      value: stats.total,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      label: 'In Review',
      value: stats.inReview,
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      label: 'Approved',
      value: stats.approved,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.label}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {item.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}