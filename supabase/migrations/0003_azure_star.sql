/*
  # Reviewer Assignment Management

  1. Changes
    - Add reviewer_limit column to manuscripts table
    - Add reviewer assignment tracking table
    - Add policies for admin access

  2. Security
    - Enable RLS on new tables
    - Add policies for admin-only access to assignment management
*/

-- Add reviewer limit to manuscripts
ALTER TABLE manuscripts 
ADD COLUMN reviewer_limit integer DEFAULT 3;

-- Create reviewer assignments table
CREATE TABLE IF NOT EXISTS reviewer_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  assigned_at timestamptz DEFAULT now(),
  status text CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  UNIQUE(manuscript_id, reviewer_id)
);

-- Enable RLS
ALTER TABLE reviewer_assignments ENABLE ROW LEVEL SECURITY;

-- Policies for reviewer assignments
CREATE POLICY "Admins can manage reviewer assignments"
  ON reviewer_assignments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Reviewers can view their own assignments"
  ON reviewer_assignments
  FOR SELECT
  USING (reviewer_id = auth.uid());

-- Function to check reviewer limit
CREATE OR REPLACE FUNCTION check_reviewer_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM reviewer_assignments
    WHERE manuscript_id = NEW.manuscript_id
  ) >= (
    SELECT reviewer_limit
    FROM manuscripts
    WHERE id = NEW.manuscript_id
  ) THEN
    RAISE EXCEPTION 'Reviewer limit reached for this manuscript';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce reviewer limit
CREATE TRIGGER enforce_reviewer_limit
  BEFORE INSERT ON reviewer_assignments
  FOR EACH ROW
  EXECUTE FUNCTION check_reviewer_limit();