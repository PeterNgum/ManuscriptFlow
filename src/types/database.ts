export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'author' | 'reviewer' | 'advisor' | 'guest'
          first_name: string
          last_name: string
          organization: string | null
          expertise_areas: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      manuscripts: {
        Row: {
          id: string
          title: string
          abstract: string | null
          keywords: string[]
          status: 'draft' | 'submitted' | 'in_review' | 'revision_requested' | 'approved' | 'rejected'
          author_id: string
          current_version: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['manuscripts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['manuscripts']['Insert']>
      }
      manuscript_versions: {
        Row: {
          id: string
          manuscript_id: string
          version_number: number
          file_url: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['manuscript_versions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['manuscript_versions']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          manuscript_id: string
          reviewer_id: string
          status: 'pending' | 'completed'
          feedback: string | null
          vote: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
    }
  }
}