/*
  # Review Round Decisions and Status Updates

  1. New Tables
    - `review_round_decisions` - Stores decisions for each review round
    - `manuscript_decision_history` - Tracks manuscript decision history

  2. Security
    - Enable RLS on new tables
    - Add policies for admins and reviewers
*/

-- Create review round decisions table
CREATE TABLE IF NOT EXISTS review_round_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid REFERENCES review_rounds(id) ON DELETE CASCADE NOT NULL,
  decision text CHECK (decision IN ('accept', 'reject', 'revise')) NOT NULL,
  rationale text,
  decided_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create manuscript decision history table
CREATE TABLE IF NOT EXISTS manuscript_decision_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  round_id uuid REFERENCES review_rounds(id) ON DELETE CASCADE NOT NULL,
  decision text CHECK (decision IN ('accept', 'reject', 'revise')) NOT NULL,
  rationale text,
  decided_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE review_round_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_decision_history ENABLE ROW LEVEL SECURITY;

-- Create policies for review round decisions
CREATE POLICY "Admins can manage review round decisions"
  ON review_round_decisions
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can view decisions for accessible manuscripts"
  ON review_round_decisions
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM review_rounds
    JOIN manuscripts ON review_rounds.manuscript_id = manuscripts.id
    WHERE review_rounds.id = round_id
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

-- Create policies for manuscript decision history
CREATE POLICY "Admins can manage manuscript decision history"
  ON manuscript_decision_history
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can view decision history for accessible manuscripts"
  ON manuscript_decision_history
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