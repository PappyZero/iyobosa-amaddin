"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/licences", label: "Licences" },
  { href: "/admin/social", label: "Social" },
  { href: "/admin/contact", label: "Contact" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="font-headline text-lg font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4 text-sm">
            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to site
              </Link>
              <span className="h-5 w-px bg-border"></span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname.startsWith(link.href) 
                      ? "text-foreground font-medium" 
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
