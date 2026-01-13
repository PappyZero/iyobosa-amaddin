# Web Portfolio - Next.js & Supabase

A modern, fully-featured personal portfolio website built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Supabase for backend services. This project demonstrates a complete full-stack application with admin dashboard, content management, and real-time data synchronization.

## 🚀 Features

### **Public-Facing Features**
- **Hero Section** - Dynamic landing with customizable content
- **About Me** - Personal profile with image and bio management
- **Projects Gallery** - Portfolio projects with image uploads and categorization
- **Skills Display** - Technical skills with categories and proficiency levels
- **Experience Timeline** - Work experience and education history
- **Blog System** - Full blog with image uploads and rich content
- **Contact Form** - Functional contact with email notifications
- **Social Media Links** - Integrated social profiles with custom ordering

### **Admin Dashboard Features**
- **Complete CRUD Operations** - Create, read, update, delete for all content
- **Authentication** - Secure admin access with Supabase Auth
- **File Uploads** - Image management with Supabase Storage
- **Email Notifications** - Contact form messages sent via Gmail SMTP
- **Responsive Design** - Mobile-friendly admin interface
- **Real-time Updates** - Instant content synchronization

### **Technical Stack**
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Auth, Storage)
- **UI Components**: Radix UI primitives with Lucide icons
- **Email Service**: Nodemailer with Gmail SMTP
- **Deployment**: Ready for Vercel, Netlify, or any Node.js host

## 🏗️ Architecture & Flow

### **Data Flow**
1. **Content Creation** → Admin creates/edits content via dashboard
2. **Database Storage** → All content saved to Supabase PostgreSQL
3. **File Management** → Images uploaded to Supabase Storage buckets
4. **Public Display** → Website fetches and displays live data
5. **User Interactions** → Contact forms send emails and save messages

### **Database Schema**
- **`hero`** - Landing page content
- **`about_me`** - Personal profile information
- **`projects`** - Portfolio projects with metadata
- **`skill_categories`** & **`skills`** - Technical skills organization
- **`experience`** & **`education`** - Professional history
- **`blog_posts`** - Blog content with image support
- **`contact_messages`** - User submissions with email notifications
- **`social_links`** - Social media profiles with custom ordering

### **Security Features**
- **Row Level Security (RLS)** - Granular access control
- **Authentication** - Secure admin login system
- **Input Validation** - Zod schema validation throughout
- **XSS Protection** - React's built-in protections

## 🛠️ Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Supabase account and project
- Gmail account (for contact form emails)

### **Installation & Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/PappyZero/webportfolio.git
   cd webportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   SMTP_FROM=your_email@gmail.com
   ADMIN_EMAIL=your_email@gmail.com
   ```

4. **Database Setup**
   
   Run the SQL schemas in order:
   ```sql
   -- Run in Supabase SQL Editor:
   -- 1. /supabase-schemas/hero-schema.sql
   -- 2. /supabase-schemas/about-schema.sql  
   -- 3. /supabase-schemas/projects-schema.sql
   -- 4. /supabase-schemas/skills-schema.sql
   -- 5. /supabase-schemas/experience-schema.sql
   -- 6. /supabase-schemas/blog-schema.sql
   -- 7. /supabase-schemas/contact-schema.sql
   -- 8. /supabase-schemas/social-schema.sql
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - **Public Site**: http://localhost:9002
   - **Admin Dashboard**: http://localhost:9002/admin

### **Admin Access**
- Navigate to `/admin` 
- Sign in with your Supabase credentials
- Start managing your portfolio content immediately

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard routes
│   │   ├── hero/          # Hero section management
│   │   ├── about/         # About section management  
│   │   ├── projects/       # Projects management
│   │   ├── skills/         # Skills management
│   │   ├── experience/     # Experience management
│   │   ├── blog/           # Blog management
│   │   ├── contact/        # Contact messages
│   │   └── social/         # Social links management
│   └── (public pages)      # Public-facing pages
├── components/
│   ├── sections/            # Public-facing sections
│   ├── admin/              # Admin form components
│   ├── ui/                 # Reusable UI components
│   └── layout/              # Layout components
├── lib/                    # Utilities and configurations
│   ├── supabase-client.ts  # Supabase client
│   ├── *.ts               # Database functions per section
│   └── data.ts             # Placeholder data
└── supabase-schemas/       # SQL migration files
```

## 🎯 Key Features Explained

### **Content Management System**
- **Live Editing**: Changes appear instantly on the website
- **Image Uploads**: Drag-and-drop image management
- **Draft Mode**: Save drafts before publishing
- **Version Control**: All changes tracked in database

### **Admin Dashboard**
- **Intuitive Interface**: Clean, modern admin design
- **Bulk Operations**: Efficient content management
- **Search & Filter**: Quick content discovery
- **Responsive**: Works on all device sizes

### **Public Website**
- **Performance Optimized**: Fast loading and navigation
- **SEO Friendly**: Proper meta tags and structure
- **Mobile Responsive**: Perfect mobile experience
- **Interactive**: Smooth animations and transitions

## 🚀 Deployment

### **Environment Setup**
```bash
# Production
npm run build

# Start production server
npm start
```

### **Deployment Platforms**
- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Git-based deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: Custom server deployment

### **Deployment Variables**
Ensure all environment variables are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SMTP_*` variables (for contact form)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Supabase Team** - For the excellent backend services
- **shadcn/ui Team** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
