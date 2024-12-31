import React, { useEffect, useState } from 'react';
import { reviewsService } from '../../services/reviews.service';
import { ReviewList } from './ReviewList';
import { useAuth } from '../../hooks/useAuth';
import type { Database } from '../../types/database';

type ReviewWithManuscript = Database['public']['Tables']['reviews']['Row'] & {
  manuscript: Database['public']['Tables']['manuscripts']['Row'];
};

export function ReviewDashboard() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewWithManuscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await reviewsService.getMyAssignedReviews();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Reviews
          </h1>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}