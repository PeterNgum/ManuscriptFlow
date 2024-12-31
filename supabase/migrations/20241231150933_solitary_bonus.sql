/*
  # Update Profile RLS Policies

  1. Changes
    - Add new RLS policy for profile creation during signup
    - Fix profile update policy using proper syntax
    - Add admin management policy
    
  2. Security
    - Maintains existing security model
    - Adds specific policy for registration flow
    - Restricts profile management to admins
*/

-- Drop existing profile policies to avoid conflicts
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

-- Create new policies with proper security checks
CREATE POLICY "Allow profile creation during signup"
  ON profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = id
    AND role != 'admin'
  );

CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own non-admin profile"
  ON profiles
  FOR UPDATE
  USING (
    auth.uid() = id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role != 'admin'
    )
  );

CREATE POLICY "Admins can manage all profiles"
  ON profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );