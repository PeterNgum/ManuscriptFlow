import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { manuscriptsService } from '../../services/manuscripts.service';
import { profilesService } from '../../services/profiles.service';
import { ReviewerList } from '../../components/admin/ReviewerList';
import { AssignedReviewers } from '../../components/admin/AssignedReviewers';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Manuscript = Database['public']['Tables']['manuscripts']['Row'];

export function ReviewerAssignment() {
  const { id } = useParams<{ id: string }>();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [availableReviewers, setAvailableReviewers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [manuscriptData, reviewersData] = await Promise.all([
          manuscriptsService.getById(id!),
          profilesService.getReviewers()
        ]);
        setManuscript(manuscriptData);
        setAvailableReviewers(reviewersData);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const handleAssignReviewer = async (reviewerId: string) => {
    if (!manuscript) return;
    try {
      await manuscriptsService.assignReviewer(manuscript.id, reviewerId);
      // Reload manuscript data to get updated reviewer list
      const updated = await manuscriptsService.getById(manuscript.id);
      setManuscript(updated);
    } catch (err) {
      console.error('Failed to assign reviewer:', err);
    }
  };

  const handleRemoveReviewer = async (reviewerId: string) => {
    if (!manuscript) return;
    try {
      await manuscriptsService.removeReviewer(manuscript.id, reviewerId);
      // Reload manuscript data to get updated reviewer list
      const updated = await manuscriptsService.getById(manuscript.id);
      setManuscript(updated);
    } catch (err) {
      console.error('Failed to remove reviewer:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !manuscript) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error || 'Manuscript not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Assign Reviewers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manuscript: {manuscript.title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Available Reviewers
              </h2>
            </div>
          </div>
          <ReviewerList
            reviewers={availableReviewers}
            onAssign={handleAssignReviewer}
          />
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Assigned Reviewers
              </h2>
            </div>
          </div>
          <AssignedReviewers
            manuscriptId={manuscript.id}
            onRemove={handleRemoveReviewer}
          />
        </div>
      </div>
    </div>
  );
}