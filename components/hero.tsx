"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Github,
  Linkedin,
  MousePointerClick,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <section className="relative py-12 md:py-32 overflow-hidden pt-32 md:pt-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/5 space-y-6 md:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-1 border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
              >
                <MousePointerClick className="mr-2 h-3 w-3" />
                Available for work
              </Badge>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
            >
              Robera
              <span className="text-primary">.</span>
              <br />
              Desissa
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              I&apos;m a Software Engineer, AI Specialist, and Hardware Enthusiast passionate about building intelligent, end-to-end solutions. I specialize in creating innovative applications that merge advanced AI technologies, robust software engineering, and hands-on hardware integration. My focus is on turning complex ideas into impactful, real-world systems that push the boundaries of both digital and physical technology.{" "}
              <Link
                href="/ai-guide"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 font-medium text-blue-500 bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors group"
              >
                Try Luna AI
                <MousePointerClick className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.p>

            {/* Social Links and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="group relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="absolute -inset-2 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <Icon className="h-5 w-5 relative z-10 text-foreground/80 hover:text-primary transition-colors" />
                      </motion.div>
                    </Link>
                  );
                })}

                {/* Luna Link */}
                <Link href="/ai-guide" className="group relative">
                  <div className="absolute -inset-2 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Sparkles className="h-5 w-5 relative z-10 text-primary hover:text-primary/80 transition-colors" />
                  </motion.div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  className="group h-11 px-6 hover:bg-primary/5 hover:border-primary/20 transition-colors w-full sm:w-auto"
                >
                  <Link
                    href="https://www.upwork.com/services/product/development-it-ai-powered-web-solutions-to-elevate-your-business-1878518563444956025?ref=project_share"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <span>Hire Me</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>

                <Button
                  asChild
                  className="group h-11 px-6 bg-primary hover:bg-primary/90 transition-colors w-full sm:w-auto"
                >
                  <Link href="#projects" className="flex items-center gap-2">
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/5"
          >
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] mx-auto">
              {/* Rotating border effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-primary/0 to-primary/20"
              />

              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-primary/5 backdrop-blur-sm" />

              {/* Inner circle */}
              <div className="absolute inset-4 rounded-full bg-background/80 backdrop-blur-xl" />

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/profile/image.jpg"
                  alt="Robera Desissa"
                  fill
                  className="rounded-full object-cover object-center p-6"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Decorative dots */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary/20"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translate(190px, -50%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
