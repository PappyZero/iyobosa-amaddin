import SkillsSection from '@/components/sections/skills';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}
