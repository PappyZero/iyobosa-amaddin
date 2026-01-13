-- Fix Contact Messages RLS Policies
-- This will completely reset and recreate policies

-- Step 1: Drop ALL existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON contact_messages;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON contact_messages;

-- Step 2: Disable RLS temporarily
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 4: Create fresh policies
CREATE POLICY "Enable read access for all users" ON contact_messages
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON contact_messages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Step 5: Verify policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'contact_messages';
