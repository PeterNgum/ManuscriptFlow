export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) {
    return error;
  }

  const err = error as any;
  
  // Handle specific Supabase errors
  if (err?.message?.includes('Email already registered')) {
    return new AuthError('Email already registered');
  }

  if (err?.message?.includes('Invalid login credentials')) {
    return new AuthError('Invalid email or password');
  }

  if (err?.message?.includes('Email rate limit exceeded')) {
    return new AuthError('Too many attempts. Please try again later.');
  }

  // Handle network errors
  if (err?.message?.includes('Failed to fetch')) {
    return new AuthError('Network error. Please check your connection.');
  }

  // Handle other errors
  return new AuthError(
    err?.message || 'An unexpected error occurred. Please try again.'
  );
}