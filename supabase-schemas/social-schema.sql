-- Create social_links table if it doesn't exist
CREATE TABLE IF NOT EXISTS social_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    icon VARCHAR(50),
    sort_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_social_links_sort_order ON social_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links(active);

-- Enable Row Level Security (RLS)
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Create policies for social_links
CREATE POLICY "Enable read access for all users" ON social_links
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON social_links
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON social_links
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON social_links
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert your social media links in preferred order
INSERT INTO social_links (platform, url, display_name, icon, sort_order, active) VALUES
    ('GitHub', 'https://github.com/PappyZero', 'PappyZero', 'Github', 1, true),
    ('LinkedIn', 'https://www.linkedin.com/in/iyobosa-amaddin-a73359387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 'Iyobosa Amaddin', 'Linkedin', 2, true),
    ('X (Twitter)', 'https://x.com/Pappy_Zero?t=T_QOWEDUaVGdgFtCSiVCQw&s=08', '@Pappy_Zero', 'Twitter', 3, true),
    ('Medium', 'https://medium.com/@amaddinmajid24', '@amaddinmajid24', 'FileText', 4, true),
    ('Stack Overflow', 'https://stackoverflow.com/users/27890327/iyobosa-amaddin', 'Iyobosa Amaddin', 'Code', 5, true),
    ('Quora', 'https://www.quora.com/profile/Amaddin-Majid', 'Amaddin Majid', 'MessageCircle', 6, true),
    ('Instagram', 'https://www.instagram.com/i.t.z_majeed?utm_source=qr', '@i.t.z_majeed', 'Instagram', 7, true),
    ('Facebook', 'https://www.facebook.com/share/1B5DxDDSim/?mibextid=wwXIfr', 'Facebook Profile', 'Facebook', 8, true);

-- Check final table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'social_links' 
AND table_schema = 'public'
ORDER BY ordinal_position;
