"use client";

import { useState } from "react";
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

const projects = [
  {
    id: "adventureseek",
    title: "AdventureSeek",
    description:
      "A comprehensive travel planning and booking platform. Features interactive maps, real-time availability, and personalized trip recommendations.",
    category: "Web Development",
    date: "January 12, 2024",
    image: "/images/project/Adventureseek.png",
    github: "#",
    demo: "#",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    features: ["Interactive Maps", "Real-time Booking", "AI Recommendations"],
    teamSize: "4 developers",
    duration: "6 months",
  },
  {
    id: "arcaureus-autonav",
    title: "Arcaureus AutoNav",
    description:
      "Advanced autonomous vehicle connectivity platform leveraging real-time MQTT communication for intelligent vehicle monitoring and control. Features comprehensive remote management capabilities and inter-vehicle data sharing for enhanced safety.",
    category: "Robotics",
    date: "January 10, 2024",
    image: "/images/project/Arcaureus_Autonav.png",
    github: "#",
    demo: "#",
    tech: ["MQTT", "Python", "React", "TensorFlow", "WebSocket"],
    features: [
      "Real-time Vehicle Monitoring",
      "Inter-vehicle Communication",
      "Remote Control Interface",
      "Predictive Safety Alerts",
      "Environmental Awareness",
    ],
    teamSize: "3 developers",
    duration: "4 months",
    highlights: [
      "Real-time data sharing between vehicles",
      "Advanced safety monitoring system",
      "Remote temperature control",
      "Comprehensive security features",
      "Intelligent traffic management",
    ],
  },
  {
    id: "arcaureus-hub",
    title: "Arcaureus Hub",
    description:
      "AI-driven, scalable smart home solution featuring advanced device integration, real-time health monitoring, and privacy-first local processing. Built with open-source principles for maximum flexibility and security.",
    category: "IoT",
    date: "January 8, 2024",
    image: "/images/project/Arcaureus_Hub.png",
    github: "#",
    demo: "#",
    tech: ["React", "Node.js", "TensorFlow.js", "WebSocket", "MQTT"],
    features: [
      "Advanced Device Integration",
      "Real-time Health Monitoring",
      "Privacy-First Local Processing",
      "Predictive Maintenance",
      "Secure API Gateway",
    ],
    teamSize: "Solo project",
    duration: "3 months",
    highlights: [
      "Open-source platform with flexible API",
      "Local AI processing for security",
      "Predictive maintenance system",
      "Real-time device management",
      "Privacy-centric architecture",
    ],
  },
  {
    id: "arcaureus-stream",
    title: "Arcaureus Stream",
    description:
      "Next-generation AI-powered entertainment platform featuring CineAI assistant, advanced content recommendations, and sophisticated natural language processing for an enhanced streaming experience.",
    category: "Streaming",
    date: "January 5, 2024",
    image: "/images/project/Arcaureus_Stream.png",
    github: "#",
    demo: "#",
    tech: [
      "Next.js 14",
      "OpenAI GPT-4",
      "Firebase",
      "TypeScript",
      "Framer Motion",
    ],
    features: [
      "AI-Powered Content Assistant",
      "Intelligent Recommendations",
      "Natural Language Search",
      "Real-time Updates",
      "Cross-referential Search",
    ],
    teamSize: "2 developers",
    duration: "5 months",
    highlights: [
      "Advanced AI conversation handling",
      "Personalized content dashboard",
      "Dynamic watchlist management",
      "Sophisticated genre analysis",
      "Modern glassmorphic UI",
    ],
  },
  {
    id: "astroexture",
    title: "AstroExture",
    description:
      "AI-powered web development platform that revolutionizes website creation with intelligent design recommendations and customization capabilities. Features advanced automation tools for seamless website updates and maintenance.",
    category: "Web Development",
    date: "January 3, 2024",
    image: "/images/project/Astroexture.jpg",
    github: "#",
    demo: "#",
    tech: ["Next.js", "TensorFlow.js", "Three.js", "Node.js", "MongoDB"],
    features: [
      "AI-Driven Design Recommendations",
      "Custom Website Builder",
      "Automated Updates",
      "Performance Analytics",
      "SEO Optimization",
    ],
    teamSize: "2 developers",
    duration: "4 months",
    highlights: [
      "Intelligent design suggestions",
      "Real-time customization",
      "Business-focused solutions",
      "Automated maintenance",
      "Performance monitoring",
    ],
  },
  {
    id: "clean-blog",
    title: "Clean Blog",
    description:
      "Modern, minimalist blogging platform with markdown support, SEO optimization, and a clean reading experience.",
    category: "Web Development",
    date: "December 28, 2023",
    image: "/images/project/Clean_Blog.png",
    github: "#",
    demo: "#",
    tech: ["Next.js", "MDX", "Tailwind CSS", "Prisma"],
    features: ["Markdown Support", "Dark Mode", "SEO Optimization"],
    teamSize: "Solo project",
    duration: "2 months",
  },
  {
    id: "innovative-solutions",
    title: "Innovative Solutions",
    description:
      "Business automation platform offering workflow optimization, task management, and performance analytics for enterprise clients.",
    category: "AI",
    date: "December 20, 2023",
    image: "/images/project/Innovative_solutions.png",
    github: "#",
    demo: "#",
    tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    features: [
      "AI-Powered Automation",
      "Analytics Dashboard",
      "Process Optimization",
    ],
    teamSize: "4 developers",
    duration: "6 months",
  },
  {
    id: "lmdx-healthcare",
    title: "LMDX Healthcare",
    description:
      "Next-generation healthcare platform integrating advanced AI technologies for predictive analytics and sophisticated medical image analysis. Streamlines patient care while enabling early disease detection and personalized treatment plans.",
    category: "Healthcare",
    date: "December 15, 2023",
    image: "/images/project/Lmdx_healthcare.jpg",
    github: "#",
    demo: "https://luminamedix.com",
    tech: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "Socket.io"],
    features: [
      "AI-Powered Diagnostics",
      "Predictive Analytics",
      "Patient Management",
      "Real-time Monitoring",
      "Appointment Scheduling",
    ],
    teamSize: "3 developers",
    duration: "5 months",
    highlights: [
      "Deep learning integration",
      "Early disease detection",
      "Personalized patient care",
      "Healthcare operations automation",
      "Secure data management",
    ],
  },
];

const categories = ["All", "IoT", "Web Development", "AI", "Healthcare"];

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
  );
};

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
        <div className="flex justify-center mb-8 sm:mb-16 overflow-x-auto">
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

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="wait">
            {projects
              .filter(
                (project) =>
                  selectedCategory === "All" ||
                  project.category === selectedCategory
              )
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
      </div>
    </section>
  );
}
