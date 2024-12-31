import React from 'react';
import { X } from 'lucide-react';
import { NotificationList } from './NotificationList';
import type { NotificationWithDetails } from '../../types/notification';

interface NotificationDropdownProps {
  notifications: NotificationWithDetails[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDropdown({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <NotificationList
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
        />
      </div>
    </div>
  );
}