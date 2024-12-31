import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';

type ReviewRound = Database['public']['Tables']['review_rounds']['Row'];

export const reviewRoundsService = {
  async startNewRound(manuscriptId: string, templateId: string): Promise<ReviewRound> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    // Get current round number
    const { data: currentRounds } = await supabase
      .from('review_rounds')
      .select('round_number')
      .eq('manuscript_id', manuscriptId)
      .order('round_number', { ascending: false })
      .limit(1);

    const nextRoundNumber = currentRounds?.[0]?.round_number 
      ? currentRounds[0].round_number + 1 
      : 1;

    const { data, error } = await supabase
      .from('review_rounds')
      .insert({
        manuscript_id: manuscriptId,
        template_id: templateId,
        round_number: nextRoundNumber,
        status: 'in_progress'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async completeRound(roundId: string, decision: 'accept' | 'reject' | 'revise') {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('review_rounds')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        decision
      })
      .eq('id', roundId);

    if (error) throw error;
  },

  async getCurrentRound(manuscriptId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('review_rounds')
      .select(`
        *,
        template:review_templates(*),
        reviews(
          *,
          reviewer:profiles(*)
        )
      `)
      .eq('manuscript_id', manuscriptId)
      .eq('status', 'in_progress')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};