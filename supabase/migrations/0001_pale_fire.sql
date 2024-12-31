/*
  # Initial Schema Setup for ManuscriptFlow

  1. New Tables
    - `profiles` (extends Supabase auth.users)
      - `id` (uuid, primary key, references auth.users)
      - `role` (enum: admin, author, reviewer, advisor, guest)
      - `first_name` (text)
      - `last_name` (text)
      - `organization` (text)
      - `expertise_areas` (text array)
      - `created_at` (timestamp)

    - `manuscripts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `abstract` (text)
      - `keywords` (text array)
      - `status` (enum: draft, submitted, in_review, revision_requested, approved, rejected)
      - `author_id` (uuid, references profiles)
      - `current_version` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `manuscript_versions`
      - `id` (uuid, primary key)
      - `manuscript_id` (uuid, references manuscripts)
      - `version_number` (integer)
      - `file_url` (text)
      - `created_at` (timestamp)

    - `reviews`
      - `id` (uuid, primary key)
      - `manuscript_id` (uuid, references manuscripts)
      - `reviewer_id` (uuid, references profiles)
      - `status` (enum: pending, completed)
      - `feedback` (text)
      - `vote` (integer, -1 to 1)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for each role type
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'author', 'reviewer', 'advisor', 'guest');
CREATE TYPE manuscript_status AS ENUM ('draft', 'submitted', 'in_review', 'revision_requested', 'approved', 'rejected');
CREATE TYPE review_status AS ENUM ('pending', 'completed');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'guest',
  first_name text NOT NULL,
  last_name text NOT NULL,
  organization text,
  expertise_areas text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create manuscripts table
CREATE TABLE IF NOT EXISTS manuscripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  abstract text,
  keywords text[] DEFAULT '{}',
  status manuscript_status NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  current_version integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create manuscript_versions table
CREATE TABLE IF NOT EXISTS manuscript_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  version_number integer NOT NULL,
  file_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(manuscript_id, version_number)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status review_status NOT NULL DEFAULT 'pending',
  feedback text,
  vote integer CHECK (vote >= -1 AND vote <= 1),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(manuscript_id, reviewer_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Manuscripts policies
CREATE POLICY "Authors can create manuscripts"
  ON manuscripts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can view own manuscripts"
  ON manuscripts FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Reviewers can view assigned manuscripts"
  ON manuscripts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM reviews
    WHERE reviews.manuscript_id = manuscripts.id
    AND reviews.reviewer_id = auth.uid()
  ));

CREATE POLICY "Advisors and admins can view all manuscripts"
  ON manuscripts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'advisor' OR profiles.role = 'admin')
  ));

-- Manuscript versions policies
CREATE POLICY "Authors can add versions to own manuscripts"
  ON manuscript_versions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM manuscripts
    WHERE manuscripts.id = manuscript_id
    AND manuscripts.author_id = auth.uid()
  ));

CREATE POLICY "Users can view versions of accessible manuscripts"
  ON manuscript_versions FOR SELECT
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

-- Reviews policies
CREATE POLICY "Reviewers can create and update assigned reviews"
  ON reviews FOR ALL
  USING (reviewer_id = auth.uid())
  WITH CHECK (reviewer_id = auth.uid());

CREATE POLICY "Authors can view reviews of own manuscripts"
  ON reviews FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM manuscripts
    WHERE manuscripts.id = manuscript_id
    AND manuscripts.author_id = auth.uid()
  ));

CREATE POLICY "Advisors and admins can view all reviews"
  ON reviews FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'advisor' OR profiles.role = 'admin')
  ));

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_manuscripts_updated_at
  BEFORE UPDATE ON manuscripts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();