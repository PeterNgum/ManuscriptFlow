import React, { useState } from 'react';
import type { NewReviewTemplate, ResponseType } from '../../../../../types/reviewTemplate';

type CriterionInput = Omit<NewReviewTemplate['criteria'][0], 'orderIndex'>;

interface CriteriaFormProps {
  onAdd: (criterion: CriterionInput) => void;
}

export function CriteriaForm({ onAdd }: CriteriaFormProps) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [responseType, setResponseType] = useState<ResponseType>('rating');
  const [required, setRequired] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      question,
      description: description || undefined,
      responseType,
      required
    });
    setQuestion('');
    setDescription('');
    setResponseType('rating');
    setRequired(true);
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add Criterion</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="responseType" className="block text-sm font-medium text-gray-700">
              Response Type
            </label>
            <select
              id="responseType"
              value={responseType}
              onChange={(e) => setResponseType(e.target.value as ResponseType)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="rating">Rating</option>
              <option value="text">Text</option>
              <option value="boolean">Yes/No</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
              Required
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Criterion
          </button>
        </div>
      </form>
    </div>
  );
}