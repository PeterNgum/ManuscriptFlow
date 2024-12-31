import React, { useEffect, useState } from 'react';
import { UserMinus } from 'lucide-react';
import { reviewsService } from '../../services/reviews.service';
import type { Database } from '../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'] & {
  reviewer: Database['public']['Tables']['profiles']['Row'];
};

interface AssignedReviewersProps {
  manuscriptId: string;
  onRemove: (reviewerId: string) => void;
}

export function AssignedReviewers({ manuscriptId, onRemove }: AssignedReviewersProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await reviewsService.getManuscriptReviews(manuscriptId);
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [manuscriptId]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No reviewers assigned
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {reviews.map((review) => (
        <li key={review.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {review.reviewer.first_name} {review.reviewer.last_name}
              </h3>
              <p className="text-sm text-gray-500">
                Status: {review.status === 'completed' ? 'Completed' : 'Pending'}
              </p>
              {review.reviewer.expertise_areas.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {review.reviewer.expertise_areas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemove(review.reviewer_id)}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <UserMinus className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}