import { getSupabaseClient } from '../lib/supabase';
import type { ReviewResponse, ReviewResponseInput } from '../types/reviewResponse';

export const reviewResponsesService = {
  async create(reviewId: string, responses: ReviewResponseInput[]) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('review_responses')
      .insert(
        responses.map(response => ({
          review_id: reviewId,
          ...response
        }))
      )
      .select();

    if (error) throw error;
    return data;
  },

  async getByReviewId(reviewId: string): Promise<ReviewResponse[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('review_responses')
      .select(`
        *,
        criteria:review_criteria(*)
      `)
      .eq('review_id', reviewId);

    if (error) throw error;
    return data;
  }
};