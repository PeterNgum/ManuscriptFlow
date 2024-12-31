import type { Database } from './database';

export type ReviewTemplate = Database['public']['Tables']['review_templates']['Row'];
export type ReviewCriteria = Database['public']['Tables']['review_criteria']['Row'];

export type ResponseType = 'rating' | 'text' | 'boolean';

export interface NewReviewTemplate {
  name: string;
  description?: string;
  criteria: Array<{
    question: string;
    description?: string;
    responseType: ResponseType;
    required: boolean;
    orderIndex: number;
  }>;
}

export interface ReviewTemplateWithCriteria extends ReviewTemplate {
  criteria: ReviewCriteria[];
}