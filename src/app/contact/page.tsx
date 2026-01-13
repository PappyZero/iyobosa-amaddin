import ContactSection from '@/components/sections/contact';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
