import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { getHeroSection } from "@/lib/hero";

const HeroSection = async () => {
  const hero = await getHeroSection();

  const title = hero?.title ?? "Full-Stack Engineer & Blockchain Architect";
  const subtitle =
    hero?.subtitle ??
    "Crafting high-performance web applications and secure, decentralized systems. Bridging the gap between frontend elegance and backend power.";
  const primaryLabel = hero?.cta_primary_label ?? "View My Work";
  const primaryUrl = hero?.cta_primary_url ?? "/projects";
  const secondaryLabel = hero?.cta_secondary_label ?? "GitHub";
  const secondaryUrl = hero?.cta_secondary_url ?? "#";

  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">{subtitle}</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={primaryUrl}>{primaryLabel}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={secondaryUrl}>
                <Github className="mr-2 h-5 w-5" />
                {secondaryLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
