export interface ReviewerStatistics {
  averageResponseDays: number;
  completedReviews: number;
  pendingReviews: number;
  onTimePercentage: number;
}

export interface ReviewerWorkload {
  currentAssignments: number;
  maxAssignments: number;
  availableSlots: number;
}