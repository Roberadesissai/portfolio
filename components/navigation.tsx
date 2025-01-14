"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun, Sparkles, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (href: string) => {
    const [path, section] = href.split("#");
    const isHome = path === "" || path === "/";
    const isSamePage = isHome ? pathname === "/" : pathname === path;

    if (isSamePage) {
      // Same page - just scroll
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Different page - navigate then scroll
      router.push(`/${path}`);
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  if (!mounted) {
    return null;
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    { href: "ai-guide#ai-interface", label: "AI Guide" },
  ];

  const isActive = (href: string) => {
    const [path, section] = href.split("#");
    const isHome = path === "" || path === "/";
    const currentPath = isHome ? "/" : `/${path}`;

    if (pathname !== currentPath) return false;

    if (!section) return true;

    // Check if section is in viewport
    const element = document.getElementById(section);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative"
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="relative rounded-2xl border border-primary/10 bg-background/30 backdrop-blur-xl backdrop-saturate-150">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent" />

            <div className="relative flex h-16 items-center justify-between px-6">
              <Link
                href="/"
                className="group relative flex items-center space-x-1"
              >
                <span className="relative font-bold text-xl text-foreground">
                  Robera
                  <span className="text-primary">.</span>
                </span>
                <div className="absolute -right-6 top-0">
                  <Sparkles className="h-3 w-3 text-primary opacity-50" />
                </div>
              </Link>

              <nav className="hidden md:block">
                <div className="flex items-center gap-1 rounded-xl bg-primary/5 p-1.5">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavigation(link.href)}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={cn(
                        "relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg",
                        "hover:text-primary",
                        isActive(link.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {isActive(link.href) && (
                        <motion.div
                          layoutId="activeBackground"
                          className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {hoveredLink === link.href && !isActive(link.href) && (
                        <motion.div
                          layoutId="hoverBackground"
                          className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {link.label}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs">
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                    <nav className="flex flex-col gap-4 mt-8">
                      {navLinks.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => {
                            handleNavigation(link.href);
                            // Close sheet after navigation
                          }}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                            isActive(link.href)
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                          )}
                        >
                          {link.label}
                        </button>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative h-9 w-9 rounded-lg border-primary/10 bg-background/50 hover:bg-primary/5"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Bottom gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
