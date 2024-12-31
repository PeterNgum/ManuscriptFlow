import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { manuscriptsService } from '../../services/manuscripts.service';
import { ManuscriptStatus } from '../../components/manuscripts/ManuscriptStatus';
import type { Database } from '../../types/database';

type Manuscript = Database['public']['Tables']['manuscripts']['Row'];

export function ManuscriptList() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Manuscripts</h1>
        <Link
          to="/manuscripts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          New Manuscript
        </Link>
      </div>

      {manuscripts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No manuscripts found</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {manuscripts.map((manuscript) => (
              <li key={manuscript.id}>
                <Link to={`/manuscripts/${manuscript.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {manuscript.title}
                      </h3>
                      <ManuscriptStatus status={manuscript.status} />
                    </div>
                    <div className="mt-2">
                      {manuscript.abstract && (
                        <p className="text-sm text-gray-500 line-clamp-2">{manuscript.abstract}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {manuscript.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}