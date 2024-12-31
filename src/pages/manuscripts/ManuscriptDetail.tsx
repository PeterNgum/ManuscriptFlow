import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { manuscriptsService } from '../../services/manuscripts.service';
import { reviewsService } from '../../services/reviews.service';
import { reviewRoundsService } from '../../services/reviewRounds.service';
import { useAuth } from '../../hooks/useAuth';
import { ManuscriptHeader } from '../../components/manuscripts/detail/ManuscriptHeader';
import { ManuscriptActions } from '../../components/manuscripts/detail/ManuscriptActions';
import { VersionSection } from '../../components/manuscripts/detail/VersionSection';
import { ReviewRoundSection } from '../../components/manuscripts/reviews/ReviewRoundSection';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { ErrorAlert } from '../../components/shared/ErrorAlert';
import type { ManuscriptWithDetails } from '../../types/manuscript';
import type { ReviewRoundWithDetails } from '../../types/reviewRound';

export function ManuscriptDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [manuscript, setManuscript] = useState<ManuscriptWithDetails | null>(null);
  const [reviewRounds, setReviewRounds] = useState<ReviewRoundWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthor = user?.id === manuscript?.author_id;
  const isAdmin = user?.role === 'admin';
  const canStartNewRound = isAdmin && manuscript?.status === 'in_review';
  const canUploadVersion = isAuthor && 
    (manuscript?.status === 'draft' || manuscript?.status === 'revision_requested');

  const loadData = async () => {
    if (!id) return;
    try {
      const [manuscriptData, roundsData] = await Promise.all([
        manuscriptsService.getById(id),
        reviewRoundsService.getByManuscriptId(id)
      ]);
      setManuscript(manuscriptData);
      setReviewRounds(roundsData);
    } catch (err) {
      setError('Failed to load manuscript data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleVersionUpload = async (file: File) => {
    if (!manuscript) return;
    try {
      await manuscriptsService.uploadVersion(
        manuscript.id,
        manuscript.current_version + 1,
        file
      );
      await loadData();
    } catch (err) {
      console.error('Failed to upload version:', err);
    }
  };

  const handleStartNewRound = async () => {
    if (!manuscript) return;
    try {
      await reviewRoundsService.create(manuscript.id);
      await loadData();
    } catch (err) {
      console.error('Failed to start new review round:', err);
    }
  };

  const handleCompleteRound = async (roundId: string) => {
    try {
      await reviewRoundsService.complete(roundId);
      await loadData();
    } catch (err) {
      console.error('Failed to complete review round:', err);
    }
  };

  const handleSubmitForReview = async () => {
    if (!manuscript) return;
    try {
      await manuscriptsService.update(manuscript.id, { status: 'submitted' });
      await loadData();
    } catch (err) {
      console.error('Failed to submit for review:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!manuscript) return <ErrorAlert message="Manuscript not found" />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ManuscriptHeader manuscript={manuscript} />
      
      <ManuscriptActions
        status={manuscript.status}
        isAuthor={isAuthor}
        onSubmit={handleSubmitForReview}
        onEdit={() => navigate(`/manuscripts/${manuscript.id}/edit`)}
        onUploadVersion={() => document.getElementById('version-upload')?.click()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VersionSection
          versions={manuscript.versions}
          canUpload={canUploadVersion}
          onVersionUpload={handleVersionUpload}
        />

        <ReviewRoundSection
          rounds={reviewRounds}
          canStartNewRound={canStartNewRound}
          onStartNewRound={handleStartNewRound}
          onCompleteRound={handleCompleteRound}
        />
      </div>
    </div>
  );
}