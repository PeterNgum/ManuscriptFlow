import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { manuscriptsService } from '../../services/manuscripts.service';
import { ManuscriptForm } from '../../components/manuscripts/ManuscriptForm';
import type { Database } from '../../types/database';

type NewManuscript = Database['public']['Tables']['manuscripts']['Insert'];

export function NewManuscript() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<NewManuscript, 'author_id'>) => {
    try {
      await manuscriptsService.create(data);
      navigate('/manuscripts');
    } catch (err) {
      setError('Failed to create manuscript');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            New Manuscript
          </h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <ManuscriptForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}