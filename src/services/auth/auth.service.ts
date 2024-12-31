import { getSupabaseClient } from '../../lib/supabase';
import { AuthError } from '../../utils/error';
import { profileService } from './profile.service';
import type { User, SignUpData } from '../../types/auth';

export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new AuthError('Authentication service unavailable');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;
      if (!data.user) throw new AuthError('Invalid login credentials');

      const profile = await profileService.getProfile(data.user.id);
      return profile;
    } catch (err) {
      throw new AuthError('Invalid login credentials');
    }
  },

  async signUp(email: string, password: string, userData: SignUpData): Promise<User> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new AuthError('Authentication service unavailable');

    try {
      // Check if email exists first
      const { data: { users } } = await supabase.auth.admin.listUsers({
        filters: { email }
      });

      if (users?.length) {
        throw new AuthError('Email already registered');
      }

      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new AuthError('Failed to create account');

      // Create profile
      await profileService.createProfile(data.user.id, userData);

      // Return signed in user
      return await this.signIn(email, password);
    } catch (err) {
      if (err instanceof AuthError) throw err;
      throw new AuthError('Failed to create account');
    }
  },

  async signOut(): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new AuthError('Authentication service unavailable');

    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError('Failed to sign out');
  }
};