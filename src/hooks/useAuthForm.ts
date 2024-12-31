import { useState } from 'react';
import { AuthError, handleAuthError } from '../utils/error';

interface UseAuthFormProps {
  onSubmit: () => Promise<void>;
}

export function useAuthForm({ onSubmit }: UseAuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await onSubmit();
    } catch (err) {
      console.error('Auth error:', err);
      const authError = handleAuthError(err);
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit,
    setError
  };
}