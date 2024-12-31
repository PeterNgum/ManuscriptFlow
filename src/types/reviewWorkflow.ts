import type { ReviewRoundWithDetails } from './reviewRound';
import type { ReviewResponse } from './reviewResponse';

export interface ReviewWorkflowState {
  currentRound: ReviewRoundWithDetails | null;
  canStartNewRound: boolean;
  canSubmitReview: boolean;
  canCompleteRound: boolean;
}

export interface ReviewSubmission {
  roundId: string;
  responses: ReviewResponse[];
  feedback?: string;
  recommendation: 'accept' | 'reject' | 'revise';
}

export interface ReviewWorkflowActions {
  startNewRound: () => Promise<void>;
  submitReview: (submission: ReviewSubmission) => Promise<void>;
  completeRound: (decision: string, notes?: string) => Promise<void>;
}