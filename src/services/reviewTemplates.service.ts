import { getSupabaseClient } from '../lib/supabase';
import type { NewReviewTemplate, ReviewTemplateWithCriteria } from '../types/reviewTemplate';

export const reviewTemplatesService = {
  async create(template: NewReviewTemplate): Promise<ReviewTemplateWithCriteria> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    // Create template
    const { data: newTemplate, error: templateError } = await supabase
      .from('review_templates')
      .insert({
        name: template.name,
        description: template.description,
        is_active: true
      })
      .select()
      .single();

    if (templateError) throw templateError;

    // Create criteria
    const { data: criteria, error: criteriaError } = await supabase
      .from('review_criteria')
      .insert(
        template.criteria.map(criterion => ({
          template_id: newTemplate.id,
          ...criterion
        }))
      )
      .select();

    if (criteriaError) throw criteriaError;

    return {
      ...newTemplate,
      criteria: criteria || []
    };
  },

  async getActiveTemplates(): Promise<ReviewTemplateWithCriteria[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { data, error } = await supabase
      .from('review_templates')
      .select('*, criteria:review_criteria(*)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Service unavailable');

    const { error } = await supabase
      .from('review_templates')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) throw error;
  }
};