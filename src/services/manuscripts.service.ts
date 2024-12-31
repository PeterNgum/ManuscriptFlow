import { getSupabaseClient } from '../lib/supabase';
import type { Database } from '../types/database';
import type { ManuscriptWithDetails } from '../types/manuscript';

export const manuscriptsService = {
  async create(data: Database['public']['Tables']['manuscripts']['Insert']) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data: manuscript, error } = await supabase
      .from('manuscripts')
      .insert(data)
      .select('*')
      .single();

    if (error) throw error;
    return manuscript;
  },

  async getById(id: string): Promise<ManuscriptWithDetails> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('manuscripts')
      .select(`
        *,
        author:profiles(*),
        versions:manuscript_versions(*),
        reviews(
          *,
          reviewer:profiles(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getMyManuscripts() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('manuscripts')
      .select(`
        *,
        author:profiles(*),
        reviews(count)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async uploadVersion(manuscriptId: string, file: File) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const filePath = `manuscripts/${manuscriptId}/${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from('manuscript-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('manuscript-files')
      .getPublicUrl(filePath);

    const { error: versionError } = await supabase
      .from('manuscript_versions')
      .insert({
        manuscript_id: manuscriptId,
        file_url: publicUrl
      });

    if (versionError) throw versionError;
  }
};