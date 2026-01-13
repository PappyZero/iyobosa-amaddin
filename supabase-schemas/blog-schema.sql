-- First, let's check what columns exist in the current blog_posts table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add all missing columns one by one
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS excerpt TEXT NOT NULL DEFAULT '';

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT '';

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS url VARCHAR(500);

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_blog_posts_sort_order ON blog_posts(sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON blog_posts;

-- Create policies for blog_posts
CREATE POLICY "Enable read access for all users" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Check final table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
