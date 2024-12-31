import { getSupabaseClient } from '../lib/supabase';
import { signupService } from './auth/signup.service';
import { AuthError } from '../utils/error';
import type { User, SignUpData } from '../types/auth';

export const authService = {
  async signIn(email: string, password: string) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;
      if (!data.user) throw new AuthError('No user data received');

      const profile = await this.getUserProfile(data.user.id);
      if (!profile) throw new AuthError('Profile not found');

      return profile;
    } catch (err) {
      console.error('Sign in failed:', err);
      throw err;
    }
  },

  async signUp(email: string, password: string, userData: SignUpData) {
    try {
      // Create auth user - this will handle duplicate email check
      const user = await signupService.createAuthUser(email, password, userData);

      try {
        // Create profile
        await signupService.createProfile(user.id, userData);
      } catch (err) {
        // Cleanup auth user if profile creation fails
        const supabase = getSupabaseClient();
        if (supabase) {
          await supabase.auth.admin.deleteUser(user.id);
        }
        throw err;
      }

      // Sign in the user
      return await this.signIn(email, password);
    } catch (err) {
      console.error('Sign up failed:', err);
      throw err;
    }
  },

  // ... rest of the service methods remain the same
};