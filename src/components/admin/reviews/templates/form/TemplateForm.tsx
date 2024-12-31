import React, { useState } from 'react';
import { CriteriaList } from './CriteriaList';
import { CriteriaForm } from './CriteriaForm';
import type { NewReviewTemplate } from '../../../../../types/reviewTemplate';

interface TemplateFormProps {
  onSubmit: (template: NewReviewTemplate) => Promise<void>;
}

export function TemplateForm({ onSubmit }: TemplateFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [criteria, setCriteria] = useState<NewReviewTemplate['criteria']>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (criteria.length === 0) {
      setError('At least one criterion is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit({ name, description, criteria });
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

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <CriteriaList criteria={criteria} onRemove={(index) => {
        setCriteria(criteria.filter((_, i) => i !== index));
      }} />

      <CriteriaForm onAdd={(criterion) => {
        setCriteria([...criteria, { ...criterion, orderIndex: criteria.length }]);
      }} />

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