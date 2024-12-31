import React from 'react';
import { formatNotificationMessage } from '../../utils/notificationUtils';
import type { NotificationWithDetails } from '../../types/notification';

interface NotificationContentProps {
  notification: NotificationWithDetails;
}

export function NotificationContent({ notification }: NotificationContentProps) {
  const { title, message } = formatNotificationMessage(notification);
  
  return (
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}