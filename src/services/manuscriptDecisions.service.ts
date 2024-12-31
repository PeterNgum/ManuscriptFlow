import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';

type Decision = Database['public']['Tables']['review_round_decisions']['Row'];
type DecisionHistory = Database['public']['Tables']['manuscript_decision_history']['Row'];

export const manuscriptDecisionsService = {
  async createRoundDecision(roundId: string, decision: string, rationale?: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('review_round_decisions')
      .insert({
        round_id: roundId,
        decision,
        rationale,
        decided_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getRoundDecisions(roundId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('review_round_decisions')
      .select(`
        *,
        decided_by:profiles(*)
      `)
      .eq('round_id', roundId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getManuscriptDecisionHistory(manuscriptId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('manuscript_decision_history')
      .select(`
        *,
        decided_by:profiles(*),
        round:review_rounds(*)
      `)
      .eq('manuscript_id', manuscriptId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};