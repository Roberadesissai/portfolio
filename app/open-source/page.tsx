"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GitFork,
  GitPullRequest,
  GitMerge,
  Users,
  Star,
  GitBranch,
  Code,
  Activity,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const contributionsData = {
  highlights: [
    {
      project: "Next.js",
      description: "Implemented new routing features",
      type: "Feature",
      status: "Merged",
      impact: "40% faster navigation",
      prLink: "https://github.com/vercel/next.js/pull/123",
    },
    {
      project: "React",
      description: "Fixed critical bug in state management",
      type: "Bug Fix",
      status: "Merged",
      impact: "Resolved memory leak",
      prLink: "https://github.com/facebook/react/pull/456",
    },
  ],
  pullRequests: [
    {
      title: "Add TypeScript Support",
      description: "Enhanced type definitions for core components",
      date: "2024-03-01",
      status: "Merged",
      prNumber: "#789",
    },
    {
      title: "Optimize Build Process",
      description: "Reduced build time by 30%",
      date: "2024-02-15",
      status: "In Review",
      prNumber: "#790",
    },
  ],
  maintenance: [
    {
      project: "UI Component Library",
      stars: "1.2k",
      forks: "234",
      contributions: "Core maintainer, 50+ PRs merged",
    },
    {
      project: "State Management Tool",
      stars: "3.4k",
      forks: "567",
      contributions: "Performance optimization lead",
    },
  ],
  involvement: [
    {
      community: "React Community",
      role: "Core Contributor",
      contributions: "Regular contributor to React ecosystem",
      impact: "Helped 500+ developers",
    },
    {
      community: "TypeScript Community",
      role: "Maintainer",
      contributions: "Documentation and type definitions",
      impact: "Improved DX for 1000+ users",
    },
  ],
};

export default function OpenSourcePage() {
  const [selectedView, setSelectedView] = useState("calendar");
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Stats */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              Open Source Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building and contributing to the future of open source software
            </p>

            {/* Contribution Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Contributions", value: "500+", icon: GitMerge },
                { label: "Pull Requests", value: "120+", icon: GitPullRequest },
                { label: "Projects", value: "25+", icon: GitBranch },
                { label: "Communities", value: "10+", icon: Users },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10"
                >
                  <stat.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-12">
        {/* GitHub Activity Section */}
        <Card className="p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Contribution Activity
            </h2>
            <div className="flex items-center gap-4">
              <Tabs value={selectedView} onValueChange={setSelectedView}>
                <TabsList>
                  <TabsTrigger value="calendar">
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="timeline">
                    <Clock className="w-4 h-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="calendar" className="mt-0">
                  <div className="aspect-[3/1] relative bg-card rounded-lg overflow-hidden p-4">
                    <div className="absolute inset-0 bg-primary/5" />
                    <Image
                      src={`https://ghchart.rshah.org/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
                      alt="GitHub Contribution Graph"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0">
                  <div className="space-y-4">
                    {contributionsData.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{highlight.project}</h3>
                            <Badge variant="outline">{highlight.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {highlight.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-primary">
                              {highlight.impact}
                            </span>
                            <Link
                              href={highlight.prLink}
                              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            >
                              View PR <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Recent Pull Requests */}
          <div className="md:col-span-8">
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-primary" />
                Recent Pull Requests
              </h3>
              <div className="space-y-4">
                {contributionsData.pullRequests.map((pr, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{pr.title}</h4>
                        <Badge variant="outline">{pr.prNumber}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pr.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-foreground">
                          {pr.date}
                        </span>
                        <Badge
                          variant={
                            pr.status === "Merged" ? "default" : "outline"
                          }
                          className="text-xs"
                        >
                          {pr.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Maintained Projects */}
          <div className="md:col-span-4">
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GitFork className="w-5 h-5 text-primary" />
                Maintained Projects
              </h3>
              <div className="space-y-4">
                {contributionsData.maintenance.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{project.project}</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm">{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4 text-primary" />
                          <span className="text-sm">{project.forks}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.contributions}
                    </p>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowAllProjects(true)}
              >
                View All Projects
              </Button>
            </Card>
          </div>
        </div>

        {/* Community Impact */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Community Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributionsData.involvement.map((involvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-primary/5 border border-primary/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">{involvement.community}</h4>
                  <Badge variant="outline">{involvement.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {involvement.contributions}
                </p>
                <p className="text-sm text-primary">{involvement.impact}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Popup for All Projects */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
            >
              <h3 className="text-xl font-semibold mb-4">
                All Maintained Projects
              </h3>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {contributionsData.maintenance.map((project, index) => (
                  <div key={index} className="p-4 rounded-lg bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{project.project}</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm">{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4 text-primary" />
                          <span className="text-sm">{project.forks}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.contributions}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowAllProjects(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
