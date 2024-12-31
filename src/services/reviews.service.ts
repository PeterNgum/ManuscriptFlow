import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];
type NewReview = Database['public']['Tables']['reviews']['Insert'];
type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export const reviewsService = {
  async create(review: NewReview) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async getMyAssignedReviews() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        manuscript:manuscripts(*)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: ReviewUpdate) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};