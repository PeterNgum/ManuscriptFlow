import { getSupabaseClient } from '../../lib/supabase';
import { AuthError } from '../../utils/error';
import type { SignUpData } from '../../types/auth';

export const signupService = {
  async checkEmailExists(email: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    // Use auth API to check if user exists
    const { data, error } = await supabase.auth.admin.listUsers({
      filters: {
        email: email
      }
    });

    if (error) {
      // Fallback to safer assumption if we can't check
      return false;
    }

    return data.users.length > 0;
  },

  async createAuthUser(email: string, password: string, userData: SignUpData) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

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

    if (error) {
      if (error.message.includes('already registered')) {
        throw new AuthError('An account with this email already exists');
      }
      throw error;
    }
    if (!data.user) throw new AuthError('Failed to create user account');

    return data.user;
  },

  async createProfile(userId: string, userData: SignUpData) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        organization: userData.organization || null,
        role: userData.role,
        expertise_areas: []
      });

    if (error) throw error;
  }
};