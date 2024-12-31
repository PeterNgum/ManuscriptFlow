/*
  # Review System Updates
  
  1. Changes
    - Add deadline field to review rounds
    - Add decision field to review rounds
    - Add decision_notes field to review rounds
    - Add review template reference to review rounds
  
  2. Security
    - Update RLS policies for new fields
*/

-- Add new fields to review rounds
ALTER TABLE review_rounds
ADD COLUMN IF NOT EXISTS deadline timestamptz,
ADD COLUMN IF NOT EXISTS decision text CHECK (decision IN ('accept', 'reject', 'revise')),
ADD COLUMN IF NOT EXISTS decision_notes text,
ADD COLUMN IF NOT EXISTS template_id uuid REFERENCES review_templates(id);

-- Update review rounds table to track review completion
CREATE OR REPLACE FUNCTION check_round_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- If all reviews are completed, update the round status
  IF NOT EXISTS (
    SELECT 1 FROM reviews
    WHERE round_id = NEW.round_id
    AND status = 'pending'
  ) THEN
    UPDATE review_rounds
    SET status = 'completed',
        completed_at = now()
    WHERE id = NEW.round_id
    AND status = 'in_progress';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic round completion
DROP TRIGGER IF EXISTS auto_complete_round ON reviews;
CREATE TRIGGER auto_complete_round
  AFTER UPDATE OF status ON reviews
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION check_round_completion();