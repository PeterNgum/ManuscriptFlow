import { useState, useEffect } from 'react';
import { manuscriptsService } from '../services/manuscripts.service';
import type { Manuscript } from '../types/manuscript';

export function useManuscripts() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadManuscripts();
  }, []);

  return {
    manuscripts,
    loading,
    error,
    refresh: loadManuscripts
  };
}