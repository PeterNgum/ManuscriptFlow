import React from 'react';
import { NotificationItem } from './NotificationItem';
import type { NotificationWithDetails } from '../../types/notification';

interface NotificationListProps {
  notifications: NotificationWithDetails[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">No notifications</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}