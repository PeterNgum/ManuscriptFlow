import { getSupabaseClient } from '../lib/supabase';
import type { Notification, NotificationPreferences } from '../types/notification';

export const notificationsService = {
  async getMyNotifications() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        manuscript:manuscripts(id, title),
        review:reviews(id)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async markAsRead(notificationId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  async markAllAsRead() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (error) throw error;
  },

  async getPreferences(): Promise<NotificationPreferences> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('notification_preferences')
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePreferences(preferences: Partial<NotificationPreferences>) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('notification_preferences')
      .update(preferences)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (error) throw error;
  }
};