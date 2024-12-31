import React, { useState, useEffect } from 'react';
import { manuscriptsService } from '../../services/manuscripts.service';
import { ManuscriptList } from '../../components/admin/manuscripts/ManuscriptList';
import { ManuscriptFilters } from '../../components/admin/manuscripts/ManuscriptFilters';
import { useManuscriptFilters } from '../../hooks/useManuscriptFilters';
import type { Database } from '../../types/database';

type ManuscriptWithAuthor = Database['public']['Tables']['manuscripts']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'];
};

export function ManuscriptManagement() {
  const [manuscripts, setManuscripts] = useState<ManuscriptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedStatus, setSelectedStatus, filterManuscripts } = useManuscriptFilters();

  useEffect(() => {
    const loadManuscripts = async () => {
      try {
        const data = await manuscriptsService.getAllManuscripts();
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

  const filteredManuscripts = filterManuscripts(manuscripts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Manuscript Management</h1>

      <div className="mb-6">
        <ManuscriptFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <ManuscriptList manuscripts={filteredManuscripts} />
    </div>
  );
}