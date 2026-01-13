-- Debug: Check if RLS policies are working correctly
-- Let's test if we can update a blog post

-- First, check if there are any blog posts
SELECT * FROM blog_posts LIMIT 1;

-- Test if we can manually update a post (replace with actual post ID if needed)
-- UPDATE blog_posts SET published = true WHERE id = 'your-post-id-here';

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- Check current user authentication
SELECT 
    auth.uid() as user_id,
    auth.role() as user_role;

-- Try a simple update test
UPDATE blog_posts 
SET published = NOT published, updated_at = CURRENT_TIMESTAMP 
WHERE id = (
    SELECT id FROM blog_posts LIMIT 1
) 
RETURNING id, published, updated_at;
