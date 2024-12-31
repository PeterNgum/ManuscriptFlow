import React from 'react';
import { Bell, Mail, Desktop } from 'lucide-react';
import { Switch } from '../shared/Switch';
import { useNotificationPreferences } from '../../hooks/useNotificationPreferences';
import type { NotificationPreferences as Preferences } from '../../types/notification';

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotificationPreferences();

  const handleToggleType = (type: keyof Preferences['notificationTypes']) => {
    updatePreferences({
      notificationTypes: {
        ...preferences.notificationTypes,
        [type]: !preferences.notificationTypes[type]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage how you receive notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
          </div>
          <Switch
            checked={preferences.emailNotifications}
            onChange={(checked) => updatePreferences({ emailNotifications: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Desktop className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-700">Desktop Notifications</span>
          </div>
          <Switch
            checked={preferences.desktopNotifications}
            onChange={(checked) => updatePreferences({ desktopNotifications: checked })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Types</h4>
        <div className="space-y-4">
          {Object.entries(preferences.notificationTypes).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <Switch
                checked={enabled}
                onChange={() => handleToggleType(type as keyof Preferences['notificationTypes'])}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}