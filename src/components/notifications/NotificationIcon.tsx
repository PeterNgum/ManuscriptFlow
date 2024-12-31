import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';

interface NotificationIconProps {
  count: number;
  onClick: () => void;
}

export function NotificationIcon({ count, onClick }: NotificationIconProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
    >
      <Bell className="h-6 w-6" />
      <NotificationBadge count={count} />
    </button>
  );
}