/*
  # Review System Enhancements

  1. New Tables
    - `review_rounds`: Tracks different rounds of review for manuscripts
    - `review_templates`: Stores review templates for different types of manuscripts
    - `review_criteria`: Stores specific criteria for reviews
    - `review_responses`: Stores reviewer responses to criteria

  2. Changes
    - Add deadline and round tracking to reviews table
    - Add template association to reviews

  3. Security
    - Enable RLS on all new tables
    - Add appropriate access policies
*/

-- Create review rounds table
CREATE TABLE IF NOT EXISTS review_rounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  round_number integer NOT NULL,
  status text CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(manuscript_id, round_number)
);

-- Create review templates table
CREATE TABLE IF NOT EXISTS review_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review criteria table
CREATE TABLE IF NOT EXISTS review_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES review_templates(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  description text,
  response_type text CHECK (response_type IN ('rating', 'text', 'boolean')) NOT NULL,
  required boolean DEFAULT true,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create review responses table
CREATE TABLE IF NOT EXISTS review_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  criteria_id uuid REFERENCES review_criteria(id) ON DELETE CASCADE NOT NULL,
  rating_value integer,
  text_value text,
  boolean_value boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(review_id, criteria_id)
);

-- Add columns to reviews table
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS deadline timestamptz,
ADD COLUMN IF NOT EXISTS round_id uuid REFERENCES review_rounds(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS template_id uuid REFERENCES review_templates(id);

-- Enable RLS
ALTER TABLE review_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage review rounds"
  ON review_rounds
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can view review rounds for accessible manuscripts"
  ON review_rounds
  FOR SELECT
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

CREATE POLICY "Admins can manage review templates"
  ON review_templates
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Everyone can view active review templates"
  ON review_templates
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage review criteria"
  ON review_criteria
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Everyone can view review criteria"
  ON review_criteria
  FOR SELECT
  USING (true);

CREATE POLICY "Reviewers can manage their review responses"
  ON review_responses
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM reviews
    WHERE reviews.id = review_id
    AND reviews.reviewer_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM reviews
    WHERE reviews.id = review_id
    AND reviews.reviewer_id = auth.uid()
  ));

CREATE POLICY "Users can view review responses for accessible manuscripts"
  ON review_responses
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM reviews
    JOIN manuscripts ON reviews.manuscript_id = manuscripts.id
    WHERE reviews.id = review_id
    AND (
      manuscripts.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM reviews r2
        WHERE r2.manuscript_id = manuscripts.id
        AND r2.reviewer_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'advisor' OR profiles.role = 'admin')
      )
    )
  ));