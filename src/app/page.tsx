import HeroSection from '@/components/sections/hero';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AboutMeSection from '@/components/sections/about-me';
import AwardsSection from '@/components/sections/awards';
import CertificationsSection from '@/components/sections/certifications';
import SocialSection from '@/components/sections/social';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutMeSection />
        <AwardsSection />
        <CertificationsSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}
