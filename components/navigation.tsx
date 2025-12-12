"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Sparkles, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                {/* Mobile Menu Dropdown */}
                <div className="relative md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <AnimatePresence mode="wait">
                      {mobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="sr-only">Toggle menu</span>
                  </Button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {mobileMenuOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setMobileMenuOpen(false)}
                          className="fixed inset-0 z-40 md:hidden"
                        />

                        {/* Dropdown Panel */}
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            bounce: 0.3,
                            duration: 0.3,
                          }}
                          className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-primary/10 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden"
                        >
                          {/* Gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                          {/* Menu Items */}
                          <nav className="relative flex flex-col p-2">
                            {navLinks.map((link, index) => (
                              <motion.button
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                  handleNavigation(link.href);
                                  setMobileMenuOpen(false);
                                }}
                                className="relative group"
                              >
                                <div
                                  className={cn(
                                    "px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-300",
                                    isActive(link.href)
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-primary"
                                  )}
                                >
                                  {isActive(link.href) && (
                                    <motion.div
                                      layoutId="mobileActiveBackground"
                                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                                      transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.4,
                                      }}
                                    />
                                  )}
                                  {!isActive(link.href) && (
                                    <motion.div
                                      className="absolute inset-0 bg-primary/5 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                  )}
                                  <div className="flex items-center justify-between">
                                    <span>{link.label}</span>
                                    {isActive(link.href) && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-primary"
                                      />
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </nav>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

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
