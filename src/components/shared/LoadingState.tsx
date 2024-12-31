import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingStateProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  onRetry?: () => void;
}

export function LoadingState({ loading, error, children, onRetry }: LoadingStateProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorAlert 
          message={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  return <>{children}</>;
}