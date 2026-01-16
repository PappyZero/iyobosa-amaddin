-- Create licences_and_certifications table
CREATE TABLE IF NOT EXISTS licences_and_certifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(500),
    image_id VARCHAR(255),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_licences_sort_order ON licences_and_certifications(sort_order);
CREATE INDEX IF NOT EXISTS idx_licences_issue_date ON licences_and_certifications(issue_date);
CREATE INDEX IF NOT EXISTS idx_licences_created_at ON licences_and_certifications(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE licences_and_certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for licences_and_certifications
CREATE POLICY "Enable read access for all users" ON licences_and_certifications
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON licences_and_certifications
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON licences_and_certifications
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON licences_and_certifications
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample licences and certifications data
INSERT INTO licences_and_certifications (title, description, issuer, issue_date, expiry_date, credential_id, credential_url, sort_order) VALUES
(
    'AWS Certified Solutions Architect',
    'Professional certification demonstrating expertise in designing distributed systems on AWS platform including compute, storage, database, and networking services.',
    'Amazon Web Services',
    '2023-06-15',
    '2026-06-15',
    'AWS-SAA-C032J4Y8',
    'https://aws.amazon.com/verification',
    1
),
(
    'Google Cloud Professional Certification',
    'Validation of technical expertise in implementing and deploying Google Cloud solutions, including compute, storage, and networking services.',
    'Google Cloud',
    '2023-09-20',
    '2025-09-20',
    'GCP-PRO-789XYZ',
    'https://cloud.google.com/certification',
    2
),
(
    'Microsoft Azure Fundamentals',
    'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    'Microsoft',
    '2023-03-10',
    '2026-03-10',
    'AZ-900-ABC123',
    'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    3
);

-- Verify insertion
SELECT * FROM licences_and_certifications ORDER BY sort_order ASC;
