"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  FolderGit2,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Code2,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { projects } from "@/config/projects";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const categories = ["All", "Web Development", "Robotics", "IoT", "Streaming", "Healthcare", "AI/Media", "IoT/Smart Home", "Entertainment/AI", "Faith/Education"];

// Map config projects to simplified format for display
const displayProjects = projects.map(p => ({
  id: p.id,
  title: p.title,
  description: p.description,
  category: p.category,
  date: p.date,
  image: p.image,
  github: p.github,
  demo: p.demo,
  tech: p.tech,
  features: p.features,
  teamSize: p.teamSize,
  duration: p.duration,
  highlights: p.nextSteps,
}));

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  github: string;
  demo: string;
  tech: string[];
  features: string[];
  teamSize: string;
  duration: string;
  highlights?: string[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm h-auto min-h-[650px] sm:h-[700px] flex flex-col">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

        {/* Project image with overlay - fixed height */}
        <div className="relative h-40 sm:h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 z-10"
            whileHover={{ opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className="bg-background/80 border-primary/20 backdrop-blur-sm"
              >
                {project.category}
              </Badge>
              <div className="flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Link href={project.github}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full bg-background/80 border-primary/20 backdrop-blur-sm hover:bg-primary/20"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={project.demo}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full bg-background/80 border-primary/20 backdrop-blur-sm hover:bg-primary/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content - flex grow to fill space */}
        <div className="p-4 sm:p-6 relative flex flex-col flex-grow">
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1 sm:gap-2">
              <FolderGit2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <Calendar className="h-3 w-3" />
              {project.date}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {project.teamSize}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Project Features */}
          <div className="mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm font-medium mb-2 flex items-center gap-2">
              <Code2 className="h-3 w-3 sm:h-4 sm:w-4" /> Key Features
            </div>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              {project.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-primary/5 text-[10px] sm:text-xs px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Duration: {project.duration}
            </span>
          </div>

          {/* Button pushed to bottom with margin-top auto */}
          <div className="mt-auto">
            <Link href={`/projects/${project.id}`} className="block">
              <Button
                variant="outline"
                className="w-full group/btn hover:border-primary/30 hover:bg-primary/5 text-sm"
              >
                <span className="flex items-center gap-2">
                  View Details
                  <motion.span className="inline-block" whileHover={{ x: 2 }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [shuffledProjects, setShuffledProjects] = useState<typeof displayProjects>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize shuffle only on client
  useEffect(() => {
    setIsClient(true);
    setShuffledProjects(shuffleArray(displayProjects));
  }, []);

  // Filter and limit projects
  const filteredProjects = useMemo(() => {
    if (shuffledProjects.length === 0) return [];
    const filtered = shuffledProjects.filter(
      (project) =>
        selectedCategory === "All" || project.category === selectedCategory
    );
    return showAll ? filtered : filtered.slice(0, 6);
  }, [shuffledProjects, selectedCategory, showAll]);

  const totalFiltered = useMemo(() => {
    if (shuffledProjects.length === 0) return 0;
    return shuffledProjects.filter(
      (project) =>
        selectedCategory === "All" || project.category === selectedCategory
    ).length;
  }, [shuffledProjects, selectedCategory]);

  // Show original projects during SSR to prevent hydration mismatch
  const displayProjectsList = isClient ? filteredProjects : displayProjects.slice(0, 6);

  return (
    <section className="py-12 sm:py-24 relative bg-background" id="projects">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 relative">
              Featured Projects
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -right-6 sm:-right-8 -top-2"
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary opacity-75" />
              </motion.div>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work across different domains of technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-0 mb-8 sm:mb-16">
          {/* Mobile Dropdown */}
          <div className="relative group md:hidden w-full px-4">
            <button className="w-full inline-flex items-center justify-between gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 px-6 py-2.5 rounded-2xl backdrop-blur-sm font-medium text-sm transition-all duration-300">
              <span>{selectedCategory}</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-4 right-4 mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-background/95 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                {/* Menu Items */}
                <nav className="relative flex flex-col p-2 max-h-96 overflow-y-auto">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                      className="relative group/item text-left"
                    >
                      <div
                        className={cn(
                          "px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-between",
                          selectedCategory === category
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground group-hover/item:text-primary"
                        )}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Desktop Horizontal Buttons */}
          <div className="hidden md:flex justify-center overflow-x-auto">
            <div className="inline-flex bg-primary/5 p-1 sm:p-1.5 rounded-2xl backdrop-blur-sm">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredCategory(category as never)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="relative px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap"
                >
                  {(selectedCategory === category ||
                    hoveredCategory === category) && (
                    <motion.div
                      layoutId="categoryBackground"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      selectedCategory === category
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="wait">
            {displayProjectsList
              .map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {totalFiltered > 6 && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold"
            >
              View More Projects ({totalFiltered - 6} more)
            </Button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="px-8 py-3 rounded-lg font-semibold"
            >
              Show Less
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}