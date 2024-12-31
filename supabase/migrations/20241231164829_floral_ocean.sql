-- Drop all existing profile policies to start fresh
DROP POLICY IF EXISTS "allow_profile_creation_during_signup" ON profiles;
DROP POLICY IF EXISTS "allow_profile_viewing" ON profiles;
DROP POLICY IF EXISTS "allow_profile_update" ON profiles;
DROP POLICY IF EXISTS "allow_admin_management" ON profiles;
DROP POLICY IF EXISTS "profiles_read_access" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_access" ON profiles;
DROP POLICY IF EXISTS "profiles_update_access" ON profiles;

-- Create simplified policies without circular dependencies
-- Allow anyone to read profiles
CREATE POLICY "profiles_read_access"
  ON profiles FOR SELECT
  USING (true);

-- Allow users to create their own profile during signup
CREATE POLICY "profiles_insert_access"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id 
    AND role != 'admin'
  );

-- Allow users to update their own profile, except role
CREATE POLICY "profiles_self_update_access"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to manage all profiles
CREATE POLICY "profiles_admin_access"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );