import { AuthError } from '@supabase/supabase-js';

export function handleAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'User already registered':
        return 'An account with this email already exists';
      default:
        return error.message;
    }
  }
  
  return 'An unexpected error occurred. Please try again.';
}

export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
}