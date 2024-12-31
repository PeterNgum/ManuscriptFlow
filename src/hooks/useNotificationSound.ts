import { useEffect, useRef } from 'react';
import { useNotificationPreferences } from './useNotificationPreferences';

export function useNotificationSound() {
  const { preferences } = useNotificationPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (preferences.desktopNotifications) {
      audioRef.current = new Audio('/notification.mp3');
    }
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [preferences.desktopNotifications]);

  const playSound = () => {
    if (audioRef.current && preferences.desktopNotifications) {
      audioRef.current.play().catch(console.error);
    }
  };

  return { playSound };
}