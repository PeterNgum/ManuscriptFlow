import type { LucideIcon } from 'lucide-react';

export interface AdminStats {
  totalManuscripts: number;
  pendingReviews: number;
  activeReviewers: number;
  avgReviewDays: number;
}

export interface ActivityItem {
  id: string;
  type: 'manuscript_submitted' | 'review_completed' | 'manuscript_approved' | 'manuscript_rejected';
  description: string;
  timestamp: string;
  icon: LucideIcon;
  manuscriptId?: string;
  reviewId?: string;
}