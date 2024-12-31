import { useState, useEffect } from 'react';
import { adminService } from '../services/admin.service';
import type { ActivityItem } from '../types/admin';

export function useActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await adminService.getRecentActivity();
        setActivities(data);
      } catch (err) {
        setError('Failed to load activity');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
    const interval = setInterval(loadActivity, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return { activities, loading, error };
}