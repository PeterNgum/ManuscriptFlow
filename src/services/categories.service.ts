import { getSupabaseClient } from '../lib/supabase';
import type { DiseaseArea } from '../types/categories';

export const categoriesService = {
  async getDiseaseAreas(): Promise<DiseaseArea[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('disease_areas')
      .select('*')
      .order('name');
      
    if (error) throw error;
    return data;
  },

  async addSecondaryCategories(
    manuscriptId: string,
    researchPillars: string[],
    dataDomains: string[],
    aiMlCategories: string[]
  ) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const promises = [];

    if (researchPillars.length > 0) {
      promises.push(
        supabase
          .from('manuscript_research_pillars')
          .insert(
            researchPillars.map(pillar => ({
              manuscript_id: manuscriptId,
              research_pillar: pillar
            }))
          )
      );
    }

    if (dataDomains.length > 0) {
      promises.push(
        supabase
          .from('manuscript_data_domains')
          .insert(
            dataDomains.map(domain => ({
              manuscript_id: manuscriptId,
              data_domain: domain
            }))
          )
      );
    }

    if (aiMlCategories.length > 0) {
      promises.push(
        supabase
          .from('manuscript_ai_ml_categories')
          .insert(
            aiMlCategories.map(category => ({
              manuscript_id: manuscriptId,
              ai_ml_category: category
            }))
          )
      );
    }

    await Promise.all(promises);
  }
};