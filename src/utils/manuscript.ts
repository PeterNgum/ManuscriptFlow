import type { ManuscriptStatus } from '../types/manuscript';

export function formatManuscriptStatus(status: ManuscriptStatus): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getStatusColor(status: ManuscriptStatus): string {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    in_review: 'bg-yellow-100 text-yellow-800',
    revision_requested: 'bg-orange-100 text-orange-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  
  return colors[status] || colors.draft;
}

export function canEditManuscript(status: ManuscriptStatus): boolean {
  return ['draft', 'revision_requested'].includes(status);
}

export function canSubmitForReview(status: ManuscriptStatus): boolean {
  return status === 'draft';
}

export function canUploadVersion(status: ManuscriptStatus): boolean {
  return ['draft', 'revision_requested'].includes(status);
}