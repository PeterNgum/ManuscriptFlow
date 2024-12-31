import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthState } from '../types/auth';

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}