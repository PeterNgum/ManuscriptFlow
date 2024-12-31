import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reviewTemplatesService } from '../../services/reviewTemplates.service';
import { TemplateList } from '../../components/reviews/templates/TemplateList';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import type { ReviewTemplateWithCriteria } from '../../types/reviewTemplate';

export function ReviewTemplates() {
  const [templates, setTemplates] = useState<ReviewTemplateWithCriteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await reviewTemplatesService.getActiveTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Failed to load review templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await reviewTemplatesService.toggleActive(id, isActive);
      setTemplates(templates.map(template =>
        template.id === id ? { ...template, is_active: isActive } : template
      ));
    } catch (err) {
      console.error('Failed to update template status:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">Review Templates</h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/admin/review-templates/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <TemplateList
          templates={templates}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}