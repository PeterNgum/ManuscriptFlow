import React from 'react';
import { Clock } from 'lucide-react';
import { formatManuscriptStatus } from '../../../utils/manuscript';
import type { StatusHistoryItem } from '../../../types/manuscript';

interface StatusHistoryProps {
  history: StatusHistoryItem[];
}

export function StatusHistory({ history }: StatusHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">No status changes recorded</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((item, idx) => (
          <li key={item.id}>
            <div className="relative pb-8">
              {idx !== history.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Changed from{' '}
                      <span className="font-medium text-gray-900">
                        {formatManuscriptStatus(item.previous_status)}
                      </span>
                      {' '}to{' '}
                      <span className="font-medium text-gray-900">
                        {formatManuscriptStatus(item.new_status)}
                      </span>
                    </p>
                    {item.reason && (
                      <p className="mt-1 text-sm text-gray-500">{item.reason}</p>
                    )}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={item.changed_at}>
                      {new Date(item.changed_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}