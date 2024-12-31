import { useMemo } from 'react';
import { FileText, PenTool, Users, BookOpen } from 'lucide-react';
import type { User } from '../types/auth';

export function useDashboardActions(user: User | null) {
  return useMemo(() => [
    {
      to: '/manuscripts/new',
      icon: FileText,
      title: 'Submit New Manuscript',
      description: 'Start a new manuscript submission',
      color: 'bg-blue-50 text-blue-700',
      show: ['author'].includes(user?.role || '')
    },
    {
      to: '/manuscripts',
      icon: BookOpen,
      title: 'My Manuscripts',
      description: 'View and manage your manuscripts',
      color: 'bg-purple-50 text-purple-700',
      show: ['author', 'admin'].includes(user?.role || '')
    },
    {
      to: '/reviews',
      icon: PenTool,
      title: 'Review Queue',
      description: 'Manage your assigned reviews',
      color: 'bg-green-50 text-green-700',
      show: ['reviewer', 'admin'].includes(user?.role || '')
    },
    {
      to: '/admin/dashboard',
      icon: Users,
      title: 'Admin Dashboard',
      description: 'Manage manuscripts and reviewers',
      color: 'bg-amber-50 text-amber-700',
      show: ['admin'].includes(user?.role || '')
    }
  ].filter(action => action.show), [user?.role]);
}