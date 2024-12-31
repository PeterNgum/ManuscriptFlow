import { getSupabaseClient } from '../lib/supabase';

export const filesService = {
  async uploadManuscriptFile(manuscriptId: string, file: File, version: number) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    // Validate file size and type
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      throw new Error('File size must be less than 50MB');
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and Word documents are allowed');
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `manuscripts/${manuscriptId}/v${version}.${fileExt}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('manuscript-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('manuscript-files')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async downloadManuscriptFile(fileUrl: string): Promise<void> {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileUrl.split('/').pop() || 'manuscript';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      throw new Error('Failed to download file');
    }
  }
};