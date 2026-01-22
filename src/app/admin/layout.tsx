"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About Me" },
  { href: "/admin/awards", label: "Awards and Achievements" },
  { href: "/admin/licences", label: "Licenses and Certifications" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/social", label: "Contact" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95">
        <div className="container flex h-14 items-center justify-between">
          {/* Mobile menu trigger + title */}
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="flex flex-col space-y-4">
                  <div className="mb-6">
                    <h2 className="font-headline text-lg font-bold">Admin Panel</h2>
                  </div>
                  <div className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "px-3 py-2 text-lg font-medium transition-colors hover:text-primary",
                          pathname.startsWith(link.href) 
                            ? "text-primary font-medium" 
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="font-headline text-lg font-bold">Admin Panel</h1>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-foreground transition-colors border border-border/40 px-3 py-1 rounded-md"
              >
                Back to site
              </Link>
              <span className="h-5 w-px bg-border"></span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary whitespace-nowrap",
                    pathname.startsWith(link.href) 
                      ? "text-primary font-medium" 
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
