```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { initSupabase } from '../lib/supabase';
import type { Database } from '../types/database';

const SupabaseContext = createContext<{
  supabase: SupabaseClient<Database> | null;
  error: string | null;
}>({
  supabase: null,
  error: null
});

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    supabase: SupabaseClient<Database> | null;
    error: string | null;
  }>({
    supabase: null,
    error: null
  });

  useEffect(() => {
    try {
      const client = initSupabase();
      setState({ supabase: client, error: null });
    } catch (err) {
      setState({ 
        supabase: null, 
        error: err instanceof Error ? err.message : 'Failed to initialize Supabase'
      });
    }
  }, []);

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {state.error}. Please ensure Supabase is properly configured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SupabaseContext.Provider value={state}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context.supabase;
}
```