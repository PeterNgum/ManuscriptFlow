import { getSupabaseClient } from '../../lib/supabase';

export const sessionService = {
  async getSession() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (err) {
      console.error('Failed to get session:', err);
      throw err;
    }
  }
};