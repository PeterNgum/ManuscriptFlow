import { getSupabaseClient } from '../lib/supabase';
import type { AnalyticsData } from '../types/analytics';

export const analyticsService = {
  async getAnalytics(): Promise<AnalyticsData> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    // Get manuscript statistics
    const { data: manuscriptStats, error: manuscriptError } = await supabase
      .rpc('get_manuscript_statistics');

    if (manuscriptError) throw manuscriptError;

    // Get review statistics
    const { data: reviewStats, error: reviewError } = await supabase
      .rpc('get_review_statistics');

    if (reviewError) throw reviewError;

    // Get submission trends
    const { data: submissionTrends, error: submissionError } = await supabase
      .rpc('get_submission_trends');

    if (submissionError) throw submissionError;

    // Get review trends
    const { data: reviewTrends, error: reviewTrendError } = await supabase
      .rpc('get_review_trends');

    if (reviewTrendError) throw reviewTrendError;

    return {
      manuscriptStats,
      reviewStats,
      submissionTrends,
      reviewTrends
    };
  }
};