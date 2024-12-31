/*
  # Review Round Decisions Schema Update

  1. New Tables
    - Add decision_type and status fields to review round decisions
    - Add version tracking to manuscript decision history
    - Add indexes for performance optimization

  2. Changes
    - Update RLS policies with additional conditions
    - Add automatic manuscript status updates
    - Add decision status tracking

  3. Security
    - Enable RLS on all new tables
    - Update access policies with proper conditions
*/

-- Add new fields and constraints
ALTER TABLE review_round_decisions
ADD COLUMN IF NOT EXISTS decision_type text CHECK (decision_type IN ('initial', 'revision', 'final')) DEFAULT 'initial',
ADD COLUMN IF NOT EXISTS status text CHECK (status IN ('draft', 'final')) DEFAULT 'draft';

ALTER TABLE manuscript_decision_history
ADD COLUMN IF NOT EXISTS status text CHECK (status IN ('draft', 'final')) DEFAULT 'final',
ADD COLUMN IF NOT EXISTS version_number integer;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_review_round_decisions_round_id ON review_round_decisions(round_id);
CREATE INDEX IF NOT EXISTS idx_manuscript_decision_history_manuscript_id ON manuscript_decision_history(manuscript_id);
CREATE INDEX IF NOT EXISTS idx_manuscript_decision_history_round_id ON manuscript_decision_history(round_id);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view decisions for accessible manuscripts" ON review_round_decisions;
DROP POLICY IF EXISTS "Users can view decision history for accessible manuscripts" ON manuscript_decision_history;

-- Create updated policies with new conditions
CREATE POLICY "Users can view decisions for accessible manuscripts"
  ON review_round_decisions
  FOR SELECT
  USING (
    status = 'final' 
    AND EXISTS (
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
    )
  );

CREATE POLICY "Users can view decision history for accessible manuscripts"
  ON manuscript_decision_history
  FOR SELECT
  USING (
    status = 'final'
    AND EXISTS (
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
    )
  );

-- Add function to automatically update manuscript status based on final decisions
CREATE OR REPLACE FUNCTION update_manuscript_status_on_decision()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'final' THEN
    UPDATE manuscripts
    SET status = CASE
      WHEN NEW.decision = 'accept' THEN 'approved'
      WHEN NEW.decision = 'reject' THEN 'rejected'
      WHEN NEW.decision = 'revise' THEN 'revision_requested'
      ELSE manuscripts.status
    END
    WHERE id = (
      SELECT manuscript_id 
      FROM review_rounds 
      WHERE id = NEW.round_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic manuscript status updates
DROP TRIGGER IF EXISTS update_manuscript_status ON review_round_decisions;
CREATE TRIGGER update_manuscript_status
  AFTER INSERT OR UPDATE OF status ON review_round_decisions
  FOR EACH ROW
  EXECUTE FUNCTION update_manuscript_status_on_decision();