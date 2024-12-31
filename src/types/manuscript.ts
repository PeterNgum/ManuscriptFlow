```typescript
import type { Database } from './database';
import type { User } from './auth';

export type ManuscriptStatus = Database['public']['Tables']['manuscripts']['Row']['status'];

export interface ManuscriptVersion {
  id: string;
  manuscript_id: string;
  version_number: number;
  file_url: string;
  created_at: string;
}

export interface ManuscriptWithDetails extends Database['public']['Tables']['manuscripts']['Row'] {
  author: User;
  versions?: ManuscriptVersion[];
  reviews?: Array<{
    id: string;
    reviewer: User;
    status: 'pending' | 'completed';
    feedback?: string;
    created_at: string;
  }>;
}

export interface NewManuscript {
  title: string;
  abstract?: string;
  keywords: string[];
  status: ManuscriptStatus;
}
```