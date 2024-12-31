import React, { createContext, useEffect, useState } from 'react';
import { authService } from '../services/auth/auth.service';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import type { AuthState } from '../types/auth';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  signIn: authService.signIn,
  signUp: authService.signUp,
  signOut: authService.signOut
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = await authService.getSession();
        if (supabase?.user) {
          const profile = await authService.getUserProfile(supabase.user.id);
          setState(prev => ({
            ...prev,
            user: profile,
            loading: false
          }));
        } else {
          setState(prev => ({
            ...prev,
            loading: false
          }));
        }
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: 'Failed to initialize authentication',
          loading: false
        }));
      }
    };

    initAuth();
  }, []);

  const contextValue: AuthState = {
    ...state,
    signIn: async (email: string, password: string) => {
      try {
        const user = await authService.signIn(email, password);
        setState(prev => ({ ...prev, user }));
        return user;
      } catch (err) {
        throw err;
      }
    },
    signUp: async (email: string, password: string, data) => {
      try {
        const user = await authService.signUp(email, password, data);
        setState(prev => ({ ...prev, user }));
        return user;
      } catch (err) {
        throw err;
      }
    },
    signOut: async () => {
      try {
        await authService.signOut();
        setState(prev => ({ ...prev, user: null }));
      } catch (err) {
        throw err;
      }
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}