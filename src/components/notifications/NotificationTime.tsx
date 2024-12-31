import React from 'react';
import { formatRelativeTime } from '../../utils/dateUtils';

interface NotificationTimeProps {
  date: string;
}

export function NotificationTime({ date }: NotificationTimeProps) {
  return (
    <span className="text-xs text-gray-500">
      {formatRelativeTime(new Date(date))}
    </span>
  );
}