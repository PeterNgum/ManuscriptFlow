import type { Database } from './database';
import type { ReviewWithReviewer } from './review';

export type ReviewRound = Database['public']['Tables']['review_rounds']['Row'];
export type ReviewRoundStatus = 'in_progress' | 'completed';
export type ReviewRoundDecision = 'accept' | 'reject' | 'revise';

export interface ReviewRoundWithDetails extends ReviewRound {
  reviews: ReviewWithReviewer[];
  template?: Database['public']['Tables']['review_templates']['Row'];
}