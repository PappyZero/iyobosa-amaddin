-- Insert sample projects data
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
     2),
     
    ('Task Management App', 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.', 
     ARRAY['Vue.js', 'Firebase', 'Vuex', 'Chart.js', 'Sass'], 
     'https://github.com/PappyZero/task-manager', 
     'https://task-manager-demo.com', 
     3),
     
    ('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts, interactive maps, and beautiful data visualizations.', 
     ARRAY['JavaScript', 'OpenWeather API', 'Chart.js', 'Bootstrap', 'Geolocation'], 
     'https://github.com/PappyZero/weather-dashboard', 
     'https://weather-demo.com', 
     4);

-- Verify the data was inserted
SELECT title, sort_order FROM projects ORDER BY sort_order;
