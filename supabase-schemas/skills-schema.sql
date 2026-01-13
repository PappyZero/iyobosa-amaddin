-- First, let's check your current tables
SELECT 
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- If you only have 'skills' table, let's check its structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'skills' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Create the skill_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS skill_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL DEFAULT 'Code',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the skills table with proper structure (drop and recreate if it exists)
DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    proficiency INTEGER NOT NULL DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skill_categories_sort_order ON skill_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_sort_order ON skills(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for skill_categories
CREATE POLICY "Enable read access for all users" ON skill_categories
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON skill_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON skill_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON skill_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for skills
CREATE POLICY "Enable read access for all users" ON skills
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON skills
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON skills
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON skills
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (optional - you can remove this)
INSERT INTO skill_categories (category, icon, sort_order) VALUES
('Frontend', 'Code', 0),
('Backend', 'HardDrive', 1),
('Database', 'Database', 2),
('Blockchain', 'Layers', 3);

-- Get the category IDs for inserting sample skills
DO $$
DECLARE
    frontend_id UUID;
    backend_id UUID;
    database_id UUID;
    blockchain_id UUID;
BEGIN
    SELECT id INTO frontend_id FROM skill_categories WHERE category = 'Frontend';
    SELECT id INTO backend_id FROM skill_categories WHERE category = 'Backend';
    SELECT id INTO database_id FROM skill_categories WHERE category = 'Database';
    SELECT id INTO blockchain_id FROM skill_categories WHERE category = 'Blockchain';
    
    INSERT INTO skills (category_id, name, proficiency, sort_order) VALUES
    (frontend_id, 'React / Next.js', 95, 0),
    (frontend_id, 'TypeScript', 90, 1),
    (frontend_id, 'Tailwind CSS', 95, 2),
    (frontend_id, 'HTML5 & CSS3', 98, 3),
    (backend_id, 'Node.js / Express', 85, 0),
    (backend_id, 'Python / Django', 70, 1),
    (backend_id, 'Firebase', 90, 2),
    (database_id, 'PostgreSQL', 80, 0),
    (database_id, 'MongoDB', 75, 1),
    (database_id, 'Firestore', 90, 2),
    (blockchain_id, 'Solidity', 85, 0),
    (blockchain_id, 'Hardhat / Foundry', 80, 1),
    (blockchain_id, 'Ethers.js / Web3.js', 90, 2),
    (blockchain_id, 'Smart Contract Auditing', 75, 3);
END $$;
