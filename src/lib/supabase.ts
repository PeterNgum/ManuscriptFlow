```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

let supabaseInstance: SupabaseClient<Database> | null = null;

export function initSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration');
  }

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });

  return supabaseInstance;
}

export function getSupabaseClient() {
  if (!supabaseInstance) {
    return initSupabase();
  }
  return supabaseInstance;
}
```