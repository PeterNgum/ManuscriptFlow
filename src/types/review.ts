import type { Database } from './database';
import type { Profile } from './profile';

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewStatus = Review['status'];

export type ReviewWithReviewer = Review & {
  reviewer: Profile;
};

export type ReviewWithManuscript = Review & {
  manuscript: Database['public']['Tables']['manuscripts']['Row'];
};

export interface ReviewVote {
  value: number;
  label: string;
  icon: 'thumbs-up' | 'thumbs-down';
}

export const REVIEW_VOTES: ReviewVote[] = [
  { value: 1, label: 'Approve', icon: 'thumbs-up' },
  { value: -1, label: 'Reject', icon: 'thumbs-down' }
];