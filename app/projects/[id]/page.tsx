"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  Globe,
  Calendar,
  Users,
  Clock,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Blocks,
  Laptop,
  Target,
  Share2,
  ExternalLink,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects } from "@/config/projects";

export default function ProjectPage() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute h-[300px] w-[300px] -top-20 -right-20 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute h-[300px] w-[300px] -bottom-20 -left-20 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />

        <Card className="relative p-8 md:p-12 max-w-md w-full mx-4 backdrop-blur-sm border-primary/10 bg-background/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >
            {/* Icon */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight">
                Project Not Found
              </h2>
              <p className="text-muted-foreground">
                The project you&apos;re looking for seems to have wandered off
                into the digital void. Let&apos;s get you back to safer grounds.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4">
              <Button asChild variant="default" className="gap-2 group">
                <Link href="/#projects">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 group">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Go Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -top-2 -left-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary/5 to-transparent -z-10 blur-3xl" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/5 to-transparent -z-10 blur-3xl" />

      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-end">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
          <motion.div
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-6"
          >
            <Link href="/#projects">
              <Button
                variant="ghost"
                className="hover:bg-background/20 group mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-primary/20 text-primary backdrop-blur-sm px-4 py-1 mb-4">
                {project.category}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {project.tech.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-background/50 backdrop-blur-sm px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-background/50 backdrop-blur-sm px-3 py-1"
                >
                  +{project.tech.length - 4} more
                </Badge>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <Tabs defaultValue="overview" className="space-y-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 p-1 bg-background/50 backdrop-blur-sm rounded-2xl border">
            <TabsTrigger value="overview" className="gap-2">
              <Blocks className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <CheckCircle2 className="h-4 w-4" /> Features
            </TabsTrigger>
            <TabsTrigger value="technical" className="gap-2">
              <Code2 className="h-4 w-4" /> Technical
            </TabsTrigger>
            <TabsTrigger value="metrics" className="gap-2">
              <Target className="h-4 w-4" /> Metrics
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
              <TabsContent value="overview" className="mt-0 space-y-8">
                <Card className="p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold">
                    <Sparkles className="h-5 w-5 text-primary" /> Project
                    Overview
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                </Card>

                {/* Challenges and Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Challenges</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                          <span className="text-muted-foreground">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Solutions</h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                          <span className="text-muted-foreground">
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <Card className="p-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold mb-6">
                    <CheckCircle2 className="h-5 w-5 text-primary" /> Key
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg border bg-card/50"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-0">
                <Card className="p-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold mb-6">
                    <Laptop className="h-5 w-5 text-primary" /> Technical Stack
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.tech.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
                      >
                        <span className="font-medium">{tech}</span>
                        <Badge variant="secondary" className="bg-primary/10">
                          Core Tech
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="mt-0">
                <Card className="p-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold mb-6">
                    <Target className="h-5 w-5 text-primary" /> Project Metrics
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, index) => (
                      <Card key={index} className="p-4 text-center">
                        <h3 className="text-sm text-muted-foreground mb-1">
                          {metric.label}
                        </h3>
                        <p className="text-2xl font-bold text-primary">
                          {metric.value}
                        </p>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Project Details</h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Released: {project.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Team: {project.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {project.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={project.demo} target="_blank">
                            <Button className="w-full group" variant="default">
                              <Globe className="mr-2 h-4 w-4" />
                              Live Demo
                              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Visit live project</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={project.github} target="_blank">
                            <Button className="w-full group" variant="outline">
                              <Github className="mr-2 h-4 w-4" />
                              Source Code
                              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>View source code</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="w-full group"
                            variant="secondary"
                            onClick={() => {
                              navigator
                                .share({
                                  title: project.title,
                                  text: project.description,
                                  url: window.location.href,
                                })
                                .catch(console.error);
                            }}
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Project
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share this project</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Next Steps Section */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-4">Next Steps</h4>
                  <div className="space-y-3">
                    {project.nextSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-card/50"
                      >
                        <Target className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>

        {/* Related Projects Section */}
        <div className="container py-20 border-t border-border">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          {projects.filter(
            (p) => p.id !== project.id && p.category === project.category
          ).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter(
                  (p) => p.id !== project.id && p.category === project.category
                )
                .slice(0, 3)
                .map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full border border-primary/10 transition-all duration-300 hover:border-primary/30">
                      <div className="relative h-48">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
                      </div>
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {relatedProject.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gradient-to-b from-background to-background/50 rounded-lg border border-border">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  No Related Projects Yet
                </h3>
                <p className="text-muted-foreground">
                  This project is unique in its category. Check out our other
                  amazing projects!
                </p>
                <Button asChild>
                  <Link href="/#projects" className="gap-2">
                    View All Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
