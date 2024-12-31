/*
  # Add Notifications System

  1. New Tables
    - `notifications` table for storing user notifications
    - Tracks notification type, message, read status, and related entities

  2. Security
    - Enable RLS
    - Add policies for user access
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  message text,
  read boolean DEFAULT false,
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE,
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notifications"
  ON notifications
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create function to send notifications
CREATE OR REPLACE FUNCTION send_notification(
  user_id uuid,
  notification_type text,
  message text,
  manuscript_id uuid DEFAULT NULL,
  review_id uuid DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO notifications (
    user_id,
    type,
    message,
    manuscript_id,
    review_id
  ) VALUES (
    user_id,
    notification_type,
    message,
    manuscript_id,
    review_id
  );
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic notifications
CREATE OR REPLACE FUNCTION notify_on_manuscript_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify author
  IF NEW.status != OLD.status THEN
    PERFORM send_notification(
      NEW.author_id,
      CASE
        WHEN NEW.status = 'revision_requested' THEN 'revision_requested'
        WHEN NEW.status = 'approved' THEN 'manuscript_approved'
        WHEN NEW.status = 'rejected' THEN 'manuscript_rejected'
        ELSE 'manuscript_status_changed'
      END,
      'Your manuscript status has been updated to ' || NEW.status,
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER manuscript_status_notification
  AFTER UPDATE OF status ON manuscripts
  FOR EACH ROW
  EXECUTE FUNCTION notify_on_manuscript_status_change();

-- Create trigger for review assignments
CREATE OR REPLACE FUNCTION notify_on_review_assignment()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify reviewer
  PERFORM send_notification(
    NEW.reviewer_id,
    'review_assigned',
    'You have been assigned to review a manuscript',
    NEW.manuscript_id,
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_assignment_notification
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION notify_on_review_assignment();