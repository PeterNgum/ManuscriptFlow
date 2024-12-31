-- Drop existing policies and function
DROP POLICY IF EXISTS "profiles_read_access" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_access" ON profiles;
DROP POLICY IF EXISTS "profiles_self_update_access" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_access" ON profiles;
DROP FUNCTION IF EXISTS auth.is_admin();

-- Create admin check function using auth metadata
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

-- Create simplified policies
CREATE POLICY "profiles_read_access"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_insert_access"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id 
    AND role != 'admin'
  );

CREATE POLICY "profiles_update_access"
  ON profiles FOR UPDATE
  USING (auth.uid() = id OR auth.is_admin())
  WITH CHECK (auth.uid() = id OR auth.is_admin());

CREATE POLICY "profiles_delete_access"
  ON profiles FOR DELETE
  USING (auth.is_admin());