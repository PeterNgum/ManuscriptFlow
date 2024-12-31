import { useState, useEffect } from 'react';
import { notificationsService } from '../services/notifications.service';
import type { NotificationPreferences } from '../types/notification';

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    desktopNotifications: false,
    notificationTypes: {
      manuscript_submitted: true,
      review_assigned: true,
      review_submitted: true,
      revision_requested: true,
      manuscript_approved: true,
      manuscript_rejected: true
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const data = await notificationsService.getPreferences();
        setPreferences(data);
      } catch (err) {
        setError('Failed to load notification preferences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      await notificationsService.updatePreferences(newPreferences);
      setPreferences(prev => ({ ...prev, ...newPreferences }));
    } catch (err) {
      console.error('Failed to update preferences:', err);
      throw err;
    }
  };

  return { preferences, loading, error, updatePreferences };
}