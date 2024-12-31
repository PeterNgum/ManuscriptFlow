import React from 'react';
import { Check } from 'lucide-react';
import { NotificationContent } from './NotificationContent';
import { NotificationTime } from './NotificationTime';
import type { NotificationWithDetails } from '../../types/notification';

interface NotificationItemProps {
  notification: NotificationWithDetails;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  return (
    <div className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start justify-between">
        <NotificationContent notification={notification} />
        <div className="flex items-center space-x-2 ml-4">
          <NotificationTime date={notification.created_at} />
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}