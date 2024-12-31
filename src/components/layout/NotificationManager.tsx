import React, { useState } from 'react';
import { NotificationIcon } from '../notifications/NotificationIcon';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { useNotificationPolling } from '../../hooks/useNotificationPolling';

export function NotificationManager() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead } = useNotificationPolling();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <NotificationIcon
        count={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setIsOpen(false)}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
        />
      )}
    </div>
  );
}