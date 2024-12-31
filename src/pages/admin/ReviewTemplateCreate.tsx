import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewTemplatesService } from '../../services/reviewTemplates.service';
import { TemplateForm } from '../../components/admin/reviews/templates/form/TemplateForm';
import type { NewReviewTemplate } from '../../types/reviewTemplate';

export function ReviewTemplateCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (template: NewReviewTemplate) => {
    await reviewTemplatesService.create(template);
    navigate('/admin/review-templates');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Review Template</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <TemplateForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}