'use client'

import Link from 'next/link'
import { Instagram, Github, Linkedin,Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com/Roberadesissai", label: "Github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/roberadesissa/", label: "LinkedIn" }
]

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
]

export function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-primary/10">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Tagline */}
          <div className="relative">
            <Link href="/" className="group inline-block">
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Robera.
                </span>
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -right-6 -top-2"
                >
                  <Sparkles className="h-4 w-4 text-primary opacity-75" />
                </motion.div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-[200px]">
                Crafting intelligent solutions through code.
              </p>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-6">
              {navLinks.map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href} 
                  className="group relative text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link 
                  key={label}
                  href={href}
                  className="group relative p-2 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <div className="relative">
                    <Icon size={20} className="relative z-10" />
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Robera Desissa. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Link 
                href="/privacy" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/terms" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

