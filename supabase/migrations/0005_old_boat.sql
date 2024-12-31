/*
  # Add Review Responses

  1. New Tables
    - `review_responses` - Stores individual responses to review criteria
      - Links reviews to specific criteria
      - Supports different response types (rating, text, boolean)
      - Tracks creation and update timestamps
      - Ensures one response per review-criteria pair

  2. Security
    - Enable RLS on review_responses
    - Add policies for reviewers to manage their responses
    - Add policies for users to view responses on accessible manuscripts
*/

-- Create review responses table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'review_responses') THEN
    CREATE TABLE review_responses (
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

    -- Enable RLS
    ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;

    -- Create RLS policies
    CREATE POLICY "Reviewers can manage their own responses"
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

    CREATE POLICY "Users can view responses for accessible manuscripts"
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

    -- Create updated_at trigger
    CREATE TRIGGER update_review_responses_updated_at
      BEFORE UPDATE ON review_responses
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
  END IF;
END $$;