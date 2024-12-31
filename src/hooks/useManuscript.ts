import { useState, useEffect } from 'react';
import { manuscriptsService } from '../services/manuscripts.service';
import type { Manuscript } from '../types/manuscript';

export function useManuscript(id: string) {
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadManuscript = async () => {
      try {
        const data = await manuscriptsService.getById(id);
        setManuscript(data);
      } catch (err) {
        setError('Failed to load manuscript');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadManuscript();
  }, [id]);

  const uploadVersion = async (file: File) => {
    if (!manuscript) return;
    try {
      await manuscriptsService.uploadVersion(manuscript.id, file);
      // Reload manuscript to get updated version info
      const updated = await manuscriptsService.getById(manuscript.id);
      setManuscript(updated);
    } catch (err) {
      setError('Failed to upload version');
      console.error(err);
      throw err;
    }
  };

  return {
    manuscript,
    loading,
    error,
    uploadVersion
  };
}