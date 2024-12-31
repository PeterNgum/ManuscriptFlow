import { useState, useEffect } from 'react';
import { reviewTemplatesService } from '../services/reviewTemplates.service';
import type { ReviewTemplateWithCriteria } from '../types/reviewTemplate';

export function useReviewTemplate(templateId: string | undefined) {
  const [template, setTemplate] = useState<ReviewTemplateWithCriteria | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      if (!templateId) {
        setTemplate(null);
        setLoading(false);
        return;
      }

      try {
        const data = await reviewTemplatesService.getById(templateId);
        setTemplate(data);
      } catch (err) {
        setError('Failed to load review template');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [templateId]);

  return { template, loading, error };
}