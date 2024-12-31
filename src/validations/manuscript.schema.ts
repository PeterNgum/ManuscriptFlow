import { z } from 'zod';

export const manuscriptSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  abstract: z.string()
    .min(1, 'Abstract is required')
    .max(5000, 'Abstract must be less than 5000 characters'),
  keywords: z.array(z.string())
    .min(1, 'At least one keyword is required')
    .max(10, 'Maximum 10 keywords allowed'),
  status: z.enum(['draft', 'submitted', 'in_review', 'revision_requested', 'approved', 'rejected']),
  current_version: z.number().int().positive()
});

export type ManuscriptInput = z.infer<typeof manuscriptSchema>;