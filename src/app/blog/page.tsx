import BlogSection from '@/components/sections/blog';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
