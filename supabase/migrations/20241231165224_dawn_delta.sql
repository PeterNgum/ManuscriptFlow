-- Drop all existing profile policies
DROP POLICY IF EXISTS "allow_profile_creation_during_signup" ON profiles;
DROP POLICY IF EXISTS "allow_profile_viewing" ON profiles;
DROP POLICY IF EXISTS "allow_profile_update" ON profiles;
DROP POLICY IF EXISTS "allow_admin_management" ON profiles;
DROP POLICY IF EXISTS "profiles_read_access" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_access" ON profiles;
DROP POLICY IF EXISTS "profiles_self_update_access" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_access" ON profiles;

-- Create function to check if user is admin without recursion
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create simplified policies using the new function
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

-- Allow users to update their own profile
CREATE POLICY "profiles_self_update_access"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to manage all profiles
CREATE POLICY "profiles_admin_access"
  ON profiles FOR ALL
  USING (auth.is_admin());