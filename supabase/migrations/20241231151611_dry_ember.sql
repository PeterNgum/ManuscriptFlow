-- Drop existing profile policies
DROP POLICY IF EXISTS "allow_profile_creation_during_signup" ON profiles;
DROP POLICY IF EXISTS "allow_profile_viewing" ON profiles;
DROP POLICY IF EXISTS "allow_profile_update" ON profiles;
DROP POLICY IF EXISTS "allow_admin_management" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own non-admin profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create new policies with proper security checks
CREATE POLICY "allow_profile_creation_during_signup"
  ON profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = id
    AND role IN ('author', 'reviewer', 'advisor', 'guest')
  );

CREATE POLICY "allow_profile_viewing"
  ON profiles
  FOR SELECT
  USING (true);

-- Split update policy into USING and WITH CHECK without OLD/NEW references
CREATE POLICY "allow_profile_update"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (
      role = (SELECT role FROM profiles WHERE id = auth.uid())
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
      )
    )
  );

CREATE POLICY "allow_admin_management"
  ON profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );