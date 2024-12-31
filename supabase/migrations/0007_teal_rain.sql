/*
  # Review Round Decisions and Status Updates

  1. New Fields
    - Add decision fields to review rounds
    - Add status transition tracking
    - Add manuscript status history

  2. Security
    - Enable RLS on new tables
    - Add policies for admins and reviewers
*/

-- Add decision fields to review rounds
ALTER TABLE review_rounds
ADD COLUMN IF NOT EXISTS decision_summary text,
ADD COLUMN IF NOT EXISTS decision_rationale text;

-- Create manuscript status history table
CREATE TABLE IF NOT EXISTS manuscript_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  previous_status text NOT NULL,
  new_status text NOT NULL,
  changed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  changed_at timestamptz DEFAULT now(),
  reason text
);

-- Enable RLS
ALTER TABLE manuscript_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage status history"
  ON manuscript_status_history
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can view status history for accessible manuscripts"
  ON manuscript_status_history
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

-- Function to track manuscript status changes
CREATE OR REPLACE FUNCTION track_manuscript_status_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO manuscript_status_history (
      manuscript_id,
      previous_status,
      new_status,
      changed_by,
      reason
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      CASE
        WHEN NEW.status = 'in_review' THEN 'Manuscript submitted for review'
        WHEN NEW.status = 'revision_requested' THEN 'Revision requested after review'
        WHEN NEW.status = 'approved' THEN 'Manuscript approved'
        WHEN NEW.status = 'rejected' THEN 'Manuscript rejected'
        ELSE 'Status updated'
      END
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status tracking
CREATE TRIGGER track_status_changes
  AFTER UPDATE OF status ON manuscripts
  FOR EACH ROW
  EXECUTE FUNCTION track_manuscript_status_changes();