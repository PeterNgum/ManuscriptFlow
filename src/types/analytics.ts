export interface ManuscriptStatistics {
  total: number;
  inReview: number;
  approved: number;
  rejected: number;
  averageReviewTime: number;
}

export interface ReviewStatistics {
  activeReviewers: number;
  averageReviewDays: number;
  completionRate: number;
  totalReviews: number;
  pendingReviews: number;
}

export interface TrendData {
  date: string;
  value: number;
}

export interface AnalyticsData {
  manuscriptStats: ManuscriptStatistics;
  reviewStats: ReviewStatistics;
  submissionTrends: TrendData[];
  reviewTrends: TrendData[];
}