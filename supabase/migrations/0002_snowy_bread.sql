/*
  # Add manuscript categorization system
  
  1. New Types
    - Creates ENUM types for each category level
  2. New Tables
    - `disease_areas`: Stores disease classifications
    - `research_pillars`: Stores research methodology areas
    - `data_domains`: Stores data type categories
    - `ai_ml_categories`: Stores AI/ML approach categories
  3. Junction Tables
    - Links manuscripts to their categories
  4. Updates
    - Adds category fields to manuscripts table
*/

-- Create ENUMs for primary categories
CREATE TYPE research_pillar_type AS ENUM (
  'data_management',
  'model_development',
  'responsible_ai',
  'model_evaluation',
  'model_deployment'
);

CREATE TYPE data_domain_type AS ENUM (
  'imaging',
  'biomarkers',
  'ehr',
  'wearable',
  'genomics',
  'temporal'
);

CREATE TYPE ai_ml_type AS ENUM (
  'supervised_learning',
  'unsupervised_learning',
  'reinforcement_learning',
  'deep_learning',
  'transfer_learning',
  'explainable_ai',
  'federated_learning'
);

-- Create category tables
CREATE TABLE IF NOT EXISTS disease_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Add base categories to manuscripts
ALTER TABLE manuscripts ADD COLUMN IF NOT EXISTS disease_area_id uuid REFERENCES disease_areas(id);
ALTER TABLE manuscripts ADD COLUMN IF NOT EXISTS primary_research_pillar research_pillar_type;
ALTER TABLE manuscripts ADD COLUMN IF NOT EXISTS primary_data_domain data_domain_type;
ALTER TABLE manuscripts ADD COLUMN IF NOT EXISTS primary_ai_ml_category ai_ml_type;

-- Create junction tables for secondary categories
CREATE TABLE IF NOT EXISTS manuscript_research_pillars (
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE,
  research_pillar research_pillar_type,
  PRIMARY KEY (manuscript_id, research_pillar)
);

CREATE TABLE IF NOT EXISTS manuscript_data_domains (
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE,
  data_domain data_domain_type,
  PRIMARY KEY (manuscript_id, data_domain)
);

CREATE TABLE IF NOT EXISTS manuscript_ai_ml_categories (
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE,
  ai_ml_category ai_ml_type,
  PRIMARY KEY (manuscript_id, ai_ml_category)
);

-- Enable RLS
ALTER TABLE disease_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_research_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_data_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_ai_ml_categories ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Disease areas viewable by everyone"
  ON disease_areas FOR SELECT
  USING (true);

CREATE POLICY "Category mappings viewable by manuscript viewers"
  ON manuscript_research_pillars FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM manuscripts
    WHERE manuscripts.id = manuscript_id
    AND (
      manuscripts.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM reviews
        WHERE reviews.manuscript_id = manuscripts.id
        AND reviews.reviewer_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'advisor' OR profiles.role = 'admin')
      )
    )
  ));

-- Repeat similar policies for other junction tables
CREATE POLICY "Category mappings viewable by manuscript viewers"
  ON manuscript_data_domains FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM manuscripts
    WHERE manuscripts.id = manuscript_id
    AND (
      manuscripts.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM reviews
        WHERE reviews.manuscript_id = manuscripts.id
        AND reviews.reviewer_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'advisor' OR profiles.role = 'admin')
      )
    )
  ));

CREATE POLICY "Category mappings viewable by manuscript viewers"
  ON manuscript_ai_ml_categories FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM manuscripts
    WHERE manuscripts.id = manuscript_id
    AND (
      manuscripts.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM reviews
        WHERE reviews.manuscript_id = manuscripts.id
        AND reviews.reviewer_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'advisor' OR profiles.role = 'admin')
      )
    )
  ));