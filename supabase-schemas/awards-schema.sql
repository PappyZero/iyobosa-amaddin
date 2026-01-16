-- Create awards_and_achievements table
CREATE TABLE IF NOT EXISTS awards_and_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date_awarded DATE NOT NULL,
    certificate_url VARCHAR(500),
    image_id VARCHAR(255),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_awards_sort_order ON awards_and_achievements(sort_order);
CREATE INDEX IF NOT EXISTS idx_awards_date_awarded ON awards_and_achievements(date_awarded);
CREATE INDEX IF NOT EXISTS idx_awards_created_at ON awards_and_achievements(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE awards_and_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for awards_and_achievements
CREATE POLICY "Enable read access for all users" ON awards_and_achievements
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON awards_and_achievements
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON awards_and_achievements
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON awards_and_achievements
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample awards data
INSERT INTO awards_and_achievements (title, description, issuer, date_awarded, certificate_url, sort_order) VALUES
    ('Best Innovation Award', 'Recognized for developing an innovative AI-powered solution that reduced processing time by 40% and improved user experience significantly.', 
     'Tech Innovation Summit 2023', '2023-06-15', 
     'https://example.com/certificate1', 1),
     
    ('Outstanding Performance Award', 'Awarded for consistently exceeding performance targets and leading critical project deliveries with exceptional quality and timeliness.', 
     'Global Tech Corporation', '2023-03-20', 
     'https://example.com/certificate2', 2),
     
    ('Full Stack Development Excellence', 'Recognized for expertise in modern web technologies and successful delivery of complex full-stack applications.', 
     'Digital Excellence Awards', '2022-11-10', 
     'https://example.com/certificate3', 3);

-- Verify table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'awards_and_achievements' 
AND table_schema = 'public'
ORDER BY ordinal_position;
