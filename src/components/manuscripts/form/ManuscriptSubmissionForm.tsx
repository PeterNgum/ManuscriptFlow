import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { manuscriptsService } from '../../../services/manuscripts.service';
import { FileUpload } from '../FileUpload';
import type { NewManuscript } from '../../../types/manuscript';

export function ManuscriptSubmissionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewManuscript>({
    title: '',
    abstract: '',
    keywords: [],
    status: 'draft'
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !file) return;

    setSubmitting(true);
    setError(null);

    try {
      // Create manuscript
      const manuscript = await manuscriptsService.create(formData);
      
      // Upload file
      await manuscriptsService.uploadVersion(manuscript.id, file);
      
      navigate(`/manuscripts/${manuscript.id}`);
    } catch (err) {
      setError('Failed to submit manuscript');
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
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Abstract</label>
        <textarea
          value={formData.abstract}
          onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Keywords</label>
        <input
          type="text"
          placeholder="Press Enter to add keywords"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              e.preventDefault();
              const keyword = e.currentTarget.value.trim();
              if (keyword && !formData.keywords.includes(keyword)) {
                setFormData(prev => ({
                  ...prev,
                  keywords: [...prev.keywords, keyword]
                }));
              }
              e.currentTarget.value = '';
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {keyword}
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  keywords: prev.keywords.filter(k => k !== keyword)
                }))}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Manuscript File</label>
        <div className="mt-1">
          <FileUpload
            onFileSelect={async (selectedFile) => {
              setFile(selectedFile);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting || !file}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Manuscript'}
        </button>
      </div>
    </form>
  );
}