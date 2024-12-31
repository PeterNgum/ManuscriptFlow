```typescript
import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';

type ReviewAssignment = Database['public']['Tables']['reviewer_assignments']['Row'];

export const reviewAssignmentsService = {
  async assignReviewer(manuscriptId: string, reviewerId: string): Promise<ReviewAssignment> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('reviewer_assignments')
      .insert({
        manuscript_id: manuscriptId,
        reviewer_id: reviewerId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAssignedReviewers(manuscriptId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('reviewer_assignments')
      .select(`
        *,
        reviewer:profiles(*)
      `)
      .eq('manuscript_id', manuscriptId);

    if (error) throw error;
    return data;
  },

  async updateAssignmentStatus(assignmentId: string, status: 'accepted' | 'declined') {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('reviewer_assignments')
      .update({ status })
      .eq('id', assignmentId);

    if (error) throw error;
  }
};
```