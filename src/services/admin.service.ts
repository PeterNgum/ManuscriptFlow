import { getSupabaseClient } from '../lib/supabase';
import type { AdminStats, ActivityItem } from '../types/admin';

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const [
      { count: totalManuscripts },
      { count: pendingReviews },
      { count: activeReviewers },
      { data: reviewTimes }
    ] = await Promise.all([
      supabase.from('manuscripts').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'reviewer'),
      supabase.from('reviews')
        .select('created_at, completed_at')
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(100)
    ]);

    // Calculate average review time
    const avgReviewDays = reviewTimes?.data?.reduce((acc, review) => {
      const start = new Date(review.created_at);
      const end = new Date(review.completed_at);
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    }, 0) / (reviewTimes?.data?.length || 1);

    return {
      totalManuscripts: totalManuscripts || 0,
      pendingReviews: pendingReviews || 0,
      activeReviewers: activeReviewers || 0,
      avgReviewDays: Math.round(avgReviewDays || 0)
    };
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data: activities, error } = await supabase
      .from('activity_log')
      .select(`
        id,
        type,
        description,
        created_at,
        manuscript_id,
        review_id
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return activities.map(activity => ({
      id: activity.id,
      type: activity.type,
      description: activity.description,
      timestamp: activity.created_at,
      manuscriptId: activity.manuscript_id,
      reviewId: activity.review_id,
      icon: getActivityIcon(activity.type)
    }));
  },

  async assignReviewer(manuscriptId: string, reviewerId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('reviewer_assignments')
      .insert({
        manuscript_id: manuscriptId,
        reviewer_id: reviewerId,
        status: 'pending'
      });

    if (error) throw error;
  },

  async removeReviewer(manuscriptId: string, reviewerId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('reviewer_assignments')
      .delete()
      .match({ manuscript_id: manuscriptId, reviewer_id: reviewerId });

    if (error) throw error;
  }
};

function getActivityIcon(type: string): LucideIcon {
  switch (type) {
    case 'manuscript_submitted':
      return FileText;
    case 'review_completed':
      return CheckCircle;
    case 'manuscript_approved':
      return ThumbsUp;
    case 'manuscript_rejected':
      return ThumbsDown;
    default:
      return Activity;
  }
}