-- Temporarily disable RLS for debugging
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Test query
SELECT COUNT(*) as project_count FROM projects;

-- Re-enable RLS after testing
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Check current RLS policies
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
