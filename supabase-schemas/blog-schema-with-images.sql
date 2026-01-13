-- Add image_url column to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Check final table structure with image_url
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
