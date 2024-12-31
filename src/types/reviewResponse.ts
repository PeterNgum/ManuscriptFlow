import type { Database } from './database';
import type { ReviewCriteria } from './reviewTemplate';

export type ReviewResponse = Database['public']['Tables']['review_responses']['Row'];

export type ReviewResponseWithCriteria = ReviewResponse & {
  criteria: ReviewCriteria;
};

export interface ReviewResponseInput {
  criteria_id: string;
  rating_value?: number;
  text_value?: string;
  boolean_value?: boolean;
}