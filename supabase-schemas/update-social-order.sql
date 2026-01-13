-- Update Social Links Order - Clean Script
-- This will clear existing data and insert in preferred order

-- Step 1: Clear existing social links
DELETE FROM social_links;

-- Step 2: Insert social links in preferred order
INSERT INTO social_links (platform, url, display_name, icon, sort_order, active) VALUES
    ('GitHub', 'https://github.com/PappyZero', 'PappyZero', 'Github', 1, true),
    ('LinkedIn', 'https://www.linkedin.com/in/iyobosa-amaddin-a73359387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 'Iyobosa Amaddin', 'Linkedin', 2, true),
    ('X (Twitter)', 'https://x.com/Pappy_Zero?t=T_QOWEDUaVGdgFtCSiVCQw&s=08', '@Pappy_Zero', 'Twitter', 3, true),
    ('Medium', 'https://medium.com/@amaddinmajid24', '@amaddinmajid24', 'FileText', 4, true),
    ('Stack Overflow', 'https://stackoverflow.com/users/27890327/iyobosa-amaddin', 'Iyobosa Amaddin', 'Code', 5, true),
    ('Quora', 'https://www.quora.com/profile/Amaddin-Majid', 'Amaddin Majid', 'MessageCircle', 6, true),
    ('Instagram', 'https://www.instagram.com/i.t.z_majeed?utm_source=qr', '@i.t.z_majeed', 'Instagram', 7, true),
    ('Facebook', 'https://www.facebook.com/share/1B5DxDDSim/?mibextid=wwXIfr', 'Facebook Profile', 'Facebook', 8, true);

-- Step 3: Verify the data was inserted correctly
SELECT 
    platform,
    display_name,
    sort_order,
    active,
    LEFT(url, 50) as url_preview
FROM social_links 
ORDER BY sort_order;
