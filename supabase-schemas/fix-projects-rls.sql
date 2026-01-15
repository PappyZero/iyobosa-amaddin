-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON projects;

-- Create new policies that allow public read access
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Allow insert for authenticated users" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow update for authenticated users" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow delete for authenticated users" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Verify the new policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'projects';

-- Test the query
SELECT COUNT(*) as project_count FROM projects;
