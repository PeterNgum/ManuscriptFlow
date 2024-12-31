```tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import { manuscriptsService } from '../../services/manuscripts.service';
import { ManuscriptList } from '../../components/manuscripts/ManuscriptList';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import type { ManuscriptWithDetails } from '../../types/manuscript';

export function ManuscriptDashboard() {
  const [manuscripts, setManuscripts] = useState<ManuscriptWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadManuscripts = async () => {
      try {
        const data = await manuscriptsService.getMyManuscripts();
        setManuscripts(data);
      } catch (err) {
        setError('Failed to load manuscripts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadManuscripts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Manuscripts
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/manuscripts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Manuscript
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <ManuscriptList manuscripts={manuscripts} />
      )}
    </div>
  );
}
```