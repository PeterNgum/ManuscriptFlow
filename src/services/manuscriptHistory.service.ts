import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';

type StatusHistory = Database['public']['Tables']['manuscript_status_history']['Row'];

export const manuscriptHistoryService = {
  async getStatusHistory(manuscriptId: string): Promise<StatusHistory[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('manuscript_status_history')
      .select(`
        *,
        changed_by:profiles(*)
      `)
      .eq('manuscript_id', manuscriptId)
      .order('changed_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};