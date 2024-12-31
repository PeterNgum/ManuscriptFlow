import { CATEGORY_LABELS } from '../constants/categories';
import type { ResearchPillar, DataDomain, AiMlCategory } from '../types/categoryTypes';

export function getCategoryLabel(category: ResearchPillar | DataDomain | AiMlCategory): string {
  return CATEGORY_LABELS[category] || category;
}

export function getSubcategories(categoryType: string, primaryCategory: string): string[] {
  const detailsMap = {
    'research_pillar': 'RESEARCH_PILLAR_DETAILS',
    'data_domain': 'DATA_DOMAIN_DETAILS',
    'ai_ml': 'AI_ML_CATEGORY_DETAILS'
  };

  const details = detailsMap[categoryType as keyof typeof detailsMap];
  if (!details) return [];

  const categoryDetails = details.find(
    (detail: any) => detail[categoryType] === primaryCategory
  );

  return categoryDetails?.subcategories || [];
}

export function validateCategories(
  primaryCategory: string,
  secondaryCategories: string[],
  allowedCategories: string[]
): boolean {
  if (!allowedCategories.includes(primaryCategory)) {
    return false;
  }

  return secondaryCategories.every(category => 
    allowedCategories.includes(category) && category !== primaryCategory
  );
}