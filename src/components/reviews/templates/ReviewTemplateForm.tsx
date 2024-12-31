```tsx
import React, { useState } from 'react';
import { reviewTemplatesService } from '../../../services/reviewTemplates.service';
import type { NewReviewTemplate } from '../../../types/reviewTemplate';

interface ReviewTemplateFormProps {
  onSubmit: (template: NewReviewTemplate) => Promise<void>;
}

export function ReviewTemplateForm({ onSubmit }: ReviewTemplateFormProps) {
  const [formData, setFormData] = useState<NewReviewTemplate>({
    name: '',
    description: '',
    criteria: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCriterion = () => {
    setFormData(prev => ({
      ...prev,
      criteria: [
        ...prev.criteria,
        {
          question: '',
          description: '',
          responseType: 'rating',
          required: true,
          orderIndex: prev.criteria.length
        }
      ]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to create template');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Template Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Review Criteria</h3>
          <button
            type="button"
            onClick={handleAddCriterion}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            Add Criterion
          </button>
        </div>

        <div className="space-y-4">
          {formData.criteria.map((criterion, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <input
                    type="text"
                    value={criterion.question}
                    onChange={(e) => {
                      const newCriteria = [...formData.criteria];
                      newCriteria[index].question = e.target.value;
                      setFormData(prev => ({ ...prev, criteria: newCriteria }));
                    }}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Response Type
                  </label>
                  <select
                    value={criterion.responseType}
                    onChange={(e) => {
                      const newCriteria = [...formData.criteria];
                      newCriteria[index].responseType = e.target.value as 'rating' | 'text' | 'boolean';
                      setFormData(prev => ({ ...prev, criteria: newCriteria }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="rating">Rating (1-5)</option>
                    <option value="text">Text Response</option>
                    <option value="boolean">Yes/No</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={criterion.required}
                    onChange={(e) => {
                      const newCriteria = [...formData.criteria];
                      newCriteria[index].required = e.target.checked;
                      setFormData(prev => ({ ...prev, criteria: newCriteria }));
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Required
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create Template'}
        </button>
      </div>
    </form>
  );
}
```