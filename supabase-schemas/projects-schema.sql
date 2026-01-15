-- Create projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    image_id VARCHAR(255),
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample project data (optional - you can remove this)
INSERT INTO projects (title, description, tech_stack, github_url, live_url, sort_order) VALUES
    ('Portfolio Website', 'A modern portfolio website built with Next.js, TypeScript, and Supabase featuring a complete admin dashboard and real-time content management.', 
     ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'], 
     'https://github.com/PappyZero/webportfolio', 
     'https://your-live-url.com', 
     1),
     
    ('E-Commerce Platform', 'Full-stack e-commerce solution with user authentication, payment processing, and inventory management built with modern web technologies.', 
     ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'], 
     'https://github.com/PappyZero/ecommerce-platform', 
     'https://demo-ecommerce.com', 
     2);

-- Check final table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND table_schema = 'public'
ORDER BY ordinal_position;
