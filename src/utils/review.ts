import type { ReviewStatus } from '../types/review';
import type { ReviewRoundStatus } from '../types/reviewRound';

export function formatReviewStatus(status: ReviewStatus): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getReviewStatusColor(status: ReviewStatus): string {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  };
  
  return colors[status] || colors.pending;
}

export function formatVote(vote: number | null): string {
  if (vote === 1) return 'Approved';
  if (vote === -1) return 'Rejected';
  return 'No vote';
}

export function formatRoundStatus(status: ReviewRoundStatus): string {
  return status === 'in_progress' ? 'In Progress' : 'Completed';
}

export function getRoundStatusColor(status: ReviewRoundStatus): string {
  return status === 'in_progress'
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-green-100 text-green-800';
}