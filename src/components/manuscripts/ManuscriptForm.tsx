import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { manuscriptsService } from '../../services/manuscripts.service';
import type { Database } from '../../types/database';

type NewManuscript = Database['public']['Tables']['manuscripts']['Insert'];

export function ManuscriptForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<NewManuscript>>({
    title: '',
    abstract: '',
    keywords: [],
    status: 'draft'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const manuscript = await manuscriptsService.create(formData as NewManuscript);
      navigate(`/manuscripts/${manuscript.id}`);
    } catch (err) {
      setError('Failed to create manuscript');
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">
            Abstract
          </label>
          <textarea
            id="abstract"
            value={formData.abstract || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <div className="mt-1">
            <input
              type="text"
              placeholder="Press Enter to add keywords"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  e.preventDefault();
                  const keyword = e.currentTarget.value.trim();
                  if (keyword && !formData.keywords?.includes(keyword)) {
                    setFormData(prev => ({
                      ...prev,
                      keywords: [...(prev.keywords || []), keyword]
                    }));
                  }
                  e.currentTarget.value = '';
                }
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.keywords?.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    keywords: prev.keywords?.filter(k => k !== keyword)
                  }))}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create Manuscript'}
        </button>
      </div>
    </form>
  );
}