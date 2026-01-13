-- Complete Contact Messages Setup Script
-- This script will create the table, indexes, and policies safely

-- Step 1: Create the table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create indexes (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);

-- Step 3: Enable RLS (only if not already enabled)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON contact_messages;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON contact_messages;

-- Step 5: Create new policies
CREATE POLICY "Enable read access for all users" ON contact_messages
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON contact_messages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Step 6: Verify setup
SELECT 
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'contact_messages' 
AND table_schema = 'public';

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_messages' 
AND table_schema = 'public'
ORDER BY ordinal_position;

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
