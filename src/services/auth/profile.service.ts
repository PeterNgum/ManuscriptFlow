import { getSupabaseClient } from '../../lib/supabase';
import { AuthError } from '../../utils/error';
import type { User, SignUpData } from '../../types/auth';

export const profileService = {
  async getProfile(userId: string): Promise<User> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new AuthError('Service unavailable');

    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new AuthError('Profile not found');
    }

    return data as User;
  },

  async createProfile(userId: string, userData: SignUpData): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new AuthError('Service unavailable');

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

    if (error) {
      throw new AuthError('Failed to create profile');
    }
  }
};