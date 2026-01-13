"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import { NAVIGATION_LINKS } from '@/lib/data';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile menu trigger + logo (mobile only) */}
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
          <div className="md:hidden">
             <Logo />
          </div>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="mb-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Logo />
            </Link>
            <div className="flex flex-col space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop: logo on the left */}
        <div className="hidden md:flex flex-1">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
        </div>

        {/* Desktop: navigation centered */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          {NAVIGATION_LINKS.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary whitespace-nowrap",
                pathname === link.href ? "text-primary" : ""
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact button aligned right (all viewports) */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
