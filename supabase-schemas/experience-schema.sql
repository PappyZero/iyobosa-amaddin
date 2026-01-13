-- First, let's check your current tables
SELECT 
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Create experience table if it doesn't exist
CREATE TABLE IF NOT EXISTS experience (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create education table if it doesn't exist
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experience_sort_order ON experience(sort_order);
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies for experience
CREATE POLICY "Enable read access for all users" ON experience
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON experience
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON experience
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON experience
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for education
CREATE POLICY "Enable read access for all users" ON education
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON education
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON education
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON education
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (optional - you can remove this)
INSERT INTO experience (role, company, period, description, sort_order) VALUES
('Lead Frontend Engineer', 'Innovatech Solutions', '2021 - Present', 'Led the development of a new component library in React and TypeScript, improving development velocity by 30%. Architected and implemented a scalable frontend for a high-traffic e-commerce platform using Next.js.', 0),
('Blockchain Developer', 'Blockstart Inc.', '2019 - 2021', 'Developed and deployed secure and optimized smart contracts on Ethereum. Integrated decentralized applications with various web3 wallets and services.', 1),
('Software Engineer', 'Tech Geniuses', '2017 - 2019', 'Contributed to full-stack web applications using the MERN stack. Worked in an agile team to deliver new features and improvements.', 2);

-- Get education sample data
INSERT INTO education (degree, institution, period, description, sort_order) VALUES
('B.Sc. in Computer Science', 'University of Technology', '2013 - 2017', 'Graduated with honors. Focused on algorithms, data structures, and distributed systems. Published a paper on consensus algorithms.', 0);
