"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Brain,
  Database,
  Server,
  BarChart,
  Box,
  Workflow,
  Terminal,
  ArrowUpRight,
  Sparkles,
  Filter,
  Cpu,
  Cloud,
} from "lucide-react";

const skills = [
  {
    name: "Python",
    level: 90,
    description:
      "Specialized in data processing, AI/ML implementations, and backend development with Django and FastAPI.",
    icon: Code2,
    category: "Programming Language",
    experience: "4+ years",
    projects: 15,
    tooling: ["Django", "FastAPI", "NumPy", "Pandas"],
    highlights: [
      "Built production ML pipelines",
      "Automated data processing workflows",
      "Developed REST APIs",
    ],
  },
  {
    name: "Next.js",
    level: 88,
    description:
      "Expert in building modern, server-side rendered React applications with advanced features and optimizations.",
    icon: Box,
    category: "Framework",
    experience: "3+ years",
    projects: 16,
    tooling: ["React", "TypeScript", "Tailwind CSS", "Prisma"],
    highlights: [
      "Server-side Rendering",
      "Static Site Generation",
      "API Routes Development",
    ],
  },
  {
    name: "JavaScript",
    level: 85,
    description:
      "Expert in modern JS, ES6+, async programming, and cross-browser compatibility.",
    icon: Terminal,
    category: "Programming Language",
    experience: "4+ years",
    projects: 20,
    tooling: ["React", "Node.js", "TypeScript", "Webpack"],
    highlights: [
      "Single Page Applications",
      "Real-time features",
      "Performance optimization",
    ],
  },
  {
    name: "C++",
    level: 88,
    description:
      "Strong foundation in system programming, data structures, and algorithms implementation.",
    icon: Code2,
    category: "Programming Language",
    experience: "4+ years",
    projects: 12,
    tooling: ["STL", "Boost", "CMake", "GDB"],
    highlights: [
      "System Programming",
      "Performance Optimization",
      "Algorithm Implementation",
    ],
  },
  {
    name: "React",
    level: 88,
    description:
      "Building scalable frontend applications with Redux, Context API, and modern React patterns.",
    icon: Box,
    category: "Framework",
    experience: "4+ years",
    projects: 18,
    tooling: ["Redux", "Next.js", "React Query", "Tailwind"],
    highlights: [
      "Component architecture",
      "State management",
      "Performance tuning",
    ],
  },
  {
    name: "Node.js",
    level: 82,
    description:
      "Server-side JavaScript development with Express, real-time applications with Socket.io.",
    icon: Server,
    category: "Runtime Environment",
    experience: "4+ years",
    projects: 12,
    tooling: ["Express", "Socket.io", "MongoDB", "JWT"],
    highlights: ["API Development", "Real-time systems", "Authentication"],
  },
  {
    name: "AI/Machine Learning",
    level: 85,
    description:
      "Implementation of neural networks, NLP models, and deep learning algorithms.",
    icon: Brain,
    category: "Technology",
    experience: "4+ years",
    projects: 10,
    tooling: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
    highlights: ["Neural Networks", "NLP Models", "Computer Vision"],
  },
  {
    name: "Data Analysis",
    level: 80,
    description:
      "Statistical analysis, data visualization, and predictive modeling using Python ecosystem.",
    icon: BarChart,
    category: "Skill",
    experience: "4+ years",
    projects: 14,
    tooling: ["Pandas", "Matplotlib", "Seaborn", "Jupyter"],
    highlights: [
      "Data Visualization",
      "Statistical Analysis",
      "Predictive Modeling",
    ],
  },
  {
    name: "GraphQL",
    level: 84,
    description:
      "Designing and implementing efficient GraphQL APIs with Apollo Server and Client integration.",
    icon: Workflow,
    category: "Technology",
    experience: "4+ years",
    projects: 8,
    tooling: ["Apollo", "TypeGraphQL", "Prisma", "Nexus"],
    highlights: ["Schema Design", "Query Optimization", "Type Safety"],
  },
  {
    name: "PostgreSQL",
    level: 83,
    description:
      "Advanced database design, query optimization, and performance tuning for large-scale applications.",
    icon: Database,
    category: "Database",
    experience: "4+ years",
    projects: 16,
    tooling: ["PgAdmin", "TypeORM", "Sequelize", "Raw SQL"],
    highlights: ["Query Optimization", "Schema Design", "Performance Tuning"],
  },
  {
    name: "AWS",
    level: 82,
    description:
      "Cloud infrastructure management and deployment using various AWS services and best practices.",
    icon: Cloud,
    category: "Technology",
    experience: "4+ years",
    projects: 11,
    tooling: ["EC2", "S3", "Lambda", "RDS"],
    highlights: ["Server Management", "Serverless Apps", "Cloud Storage"],
  },
  {
    name: "TensorFlow",
    level: 81,
    description:
      "Developing and deploying machine learning models using TensorFlow ecosystem.",
    icon: Cpu,
    category: "Framework",
    experience: "4+ years",
    projects: 7,
    tooling: ["Keras", "TF.js", "TFLite", "TF Serving"],
    highlights: ["Model Training", "Model Deployment", "Mobile Integration"],
  },
];

const categories = [
  "All",
  "Programming Language",
  "Framework",
  "Technology",
  "Database",
  "DevOps",
  "Architecture",
  "Tool",
  "Skill",
];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [detailView, setDetailView] = useState(false);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      className="py-12 xs:py-16 sm:py-24 relative bg-background"
      id="skills"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-12 sm:mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 xs:mb-4">
              Skills & Expertise
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
                className="absolute -right-6 xs:-right-8 -top-1 xs:-top-2"
              >
                <Sparkles className="h-5 w-5 xs:h-6 xs:w-6 text-primary opacity-75" />
              </motion.div>
            </h2>
          </div>
          <p className="text-sm xs:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            A comprehensive overview of my technical proficiencies and
            specialized knowledge
          </p>
        </motion.div>

        {/* Category Filter and View Toggle */}
        <div className="flex flex-col xs:flex-row justify-between items-center mb-8 xs:mb-10 sm:mb-12 gap-4 xs:gap-6">
          {/* Category Filter */}
          <div className="w-full xs:w-auto overflow-x-auto pb-2 xs:pb-0">
            <div className="inline-flex bg-primary/5 p-1 xs:p-1.5 rounded-2xl backdrop-blur-sm min-w-full xs:min-w-0">
              {categories.slice(0, 5).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="relative px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium transition-all duration-300 whitespace-nowrap"
                >
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="categoryBackground"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
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

          {/* View Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs xs:text-sm h-8 xs:h-9"
            onClick={() => setDetailView(!detailView)}
          >
            <Filter className="h-3 w-3 xs:h-4 xs:w-4" />
            {detailView ? "Simple View" : "Detailed View"}
          </Button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="relative overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 h-full flex flex-col"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <div className="p-4 xs:p-6 flex flex-col h-full relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge
                            variant="secondary"
                            className="mb-2 bg-primary/5 text-xs"
                          >
                            {skill.category}
                          </Badge>
                          <h3 className="text-base xs:text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                        </div>
                        <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                          <Icon className="w-4 h-4 xs:w-5 xs:h-5" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                        {skill.description}
                      </p>

                      {/* Detailed View Content */}
                      {detailView && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs xs:text-sm">
                              <span className="text-muted-foreground">
                                Experience:
                              </span>
                              <span className="font-medium">
                                {skill.experience}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs xs:text-sm">
                              <span className="text-muted-foreground">
                                Projects:
                              </span>
                              <span className="font-medium">
                                {skill.projects}+
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs xs:text-sm font-medium mb-2">
                              Tools & Technologies:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {skill.tooling.map((tool) => (
                                <Badge
                                  key={tool}
                                  variant="outline"
                                  className="bg-primary/5 text-[10px] xs:text-xs"
                                >
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs xs:text-sm font-medium mb-2">
                              Highlights:
                            </p>
                            <ul className="text-xs xs:text-sm text-muted-foreground space-y-1">
                              {skill.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Proficiency Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs xs:text-sm mb-2">
                          <div className="text-muted-foreground">
                            Proficiency Level
                          </div>
                          <div className="font-medium">{skill.level}%</div>
                        </div>

                        <motion.div
                          className="w-full h-1 bg-primary/10 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </motion.div>
                      </div>

                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <ArrowUpRight className="h-3 w-3 xs:h-4 xs:w-4 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
