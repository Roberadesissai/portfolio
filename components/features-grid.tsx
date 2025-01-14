import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Sparkles,
  Cpu,
  Database,
  Workflow,
  GitBranch,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface FeaturesGridProps {
  onQuickPrompt: (
    prompt: string,
    type: "chat" | "analyze" | "generate"
  ) => void;
  onStartAI: () => void;
}

export function FeaturesGrid({ onQuickPrompt, onStartAI }: FeaturesGridProps) {
  const features = [
    {
      title: "AI-Powered Analysis",
      description:
        "Get intelligent insights and suggestions for improving your portfolio structure and content.",
      icon: Brain,
      tag: "Analytics",
      quickPrompt: `Analyze my portfolio structure with focus on:
- Code architecture and patterns
- Performance metrics and optimization opportunities
- Security best practices implementation
- Scalability considerations
- Database design and data flow
- API structure and documentation
- Frontend component organization
- Testing coverage and methodology
Please provide detailed recommendations for each area.`,
      type: "analyze" as const,
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      examples: [
        "Portfolio structure analysis",
        "Content optimization suggestions",
        "SEO recommendations",
      ],
    },
    {
      title: "Smart Code Review",
      description:
        "Get real-time code analysis, best practices, and optimization suggestions from our AI.",
      icon: Code2,
      tag: "Development",
      quickPrompt: `Review my codebase and provide insights on:
- Code quality and maintainability
- Design patterns implementation
- Error handling and edge cases
- Performance bottlenecks
- Memory management
- Dependency management
- Code duplication
- TypeScript type safety
Suggest specific improvements with code examples where applicable.`,
      type: "analyze" as const,
      color: "from-emerald-500/10 to-green-500/10",
      borderColor: "border-emerald-500/20",
      examples: [
        "Code quality analysis",
        "Performance optimization",
        "Best practices review",
      ],
    },
    {
      title: "Project Documentation",
      description:
        "Generate comprehensive documentation for your projects with AI assistance.",
      icon: Database,
      tag: "Documentation",
      quickPrompt: `Generate detailed project documentation including:
- Project architecture overview
- Setup and installation guide
- API endpoints documentation
- Database schema
- Authentication flow
- Deployment procedures
- Environment configuration
- Testing strategies
- Performance optimization guidelines
- Security considerations
- Error handling procedures
- Monitoring and logging
Please format with proper markdown and include code examples.`,
      type: "generate" as const,
      color: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      examples: [
        "API documentation",
        "Technical specifications",
        "User guides",
      ],
    },
    {
      title: "Workflow Optimization",
      description:
        "Streamline your development workflow with AI-powered suggestions and automation.",
      icon: Workflow,
      tag: "Productivity",
      quickPrompt: `Analyze and optimize development workflow focusing on:
- CI/CD pipeline efficiency
- Git workflow and branching strategy
- Code review process
- Testing automation
- Deployment procedures
- Development environment setup
- Team collaboration tools
- Code quality gates
- Performance monitoring
- Security scanning
Provide specific recommendations for each area with implementation details.`,
      type: "analyze" as const,
      color: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
      examples: [
        "CI/CD improvements",
        "Development processes",
        "Team collaboration",
      ],
    },
    {
      title: "Interactive Learning",
      description:
        "Learn best practices and improve your skills with AI-guided tutorials and feedback.",
      icon: Lightbulb,
      tag: "Education",
      quickPrompt: `Create an interactive learning guide for:
- Modern web development best practices
- Advanced TypeScript patterns
- React optimization techniques
- State management strategies
- Testing methodologies
- Performance optimization
- Security best practices
- API design principles
Include practical exercises and code examples for each topic.`,
      type: "generate" as const,
      color: "from-yellow-500/10 to-amber-500/10",
      borderColor: "border-yellow-500/20",
      examples: ["Coding tutorials", "Best practices", "Skill improvement"],
    },
    {
      title: "Portfolio Enhancement",
      description:
        "Get personalized suggestions to make your portfolio stand out and attract opportunities.",
      icon: Rocket,
      tag: "Growth",
      quickPrompt: `Analyze and provide recommendations for portfolio enhancement:
- Project presentation and structure
- Technical writing and documentation
- Code quality and organization
- UI/UX improvements
- Performance optimization
- SEO and accessibility
- Personal branding
- Professional impact
Include specific examples and implementation strategies for each area.`,
      type: "analyze" as const,
      color: "from-indigo-500/10 to-violet-500/10",
      borderColor: "border-indigo-500/20",
      examples: [
        "Visual improvements",
        "Content strategy",
        "Personal branding",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative"
        >
          <div
            className={`
            relative p-6 rounded-2xl border ${feature.borderColor}
            bg-white dark:bg-zinc-900 hover:shadow-lg transition-all duration-300
          `}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="bg-background/50">
                  {feature.tag}
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Examples:</div>
                <ul className="space-y-2">
                  {feature.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <GitBranch className="w-4 h-4 text-primary" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full group/button"
                variant="outline"
                onClick={() => onQuickPrompt(feature.quickPrompt, feature.type)}
              >
                <Cpu className="w-4 h-4 mr-2 group-hover/button:animate-spin" />
                Try Quick Prompt
              </Button>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="lg:col-span-3"
      >
        <div className="relative p-4 xs:p-6 sm:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
          <div className="relative flex flex-col gap-4 xs:gap-6 sm:gap-8">
            <div className="space-y-2 text-center xs:text-left">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold">
                Ready to Try Luna?
              </h3>
              <p className="text-sm xs:text-base text-muted-foreground max-w-[42ch] mx-auto xs:mx-0">
                Experience the power of AI-driven portfolio enhancement with
                Luna&apos;s intelligent insights.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
              <Button
                size="default"
                className="w-full xs:w-auto h-9 xs:h-10 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 group"
                onClick={onStartAI}
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Start Using Luna
              </Button>
              <Link href="/docs/getting-started" className="w-full xs:w-auto">
                <Button
                  size="default"
                  variant="outline"
                  className="w-full h-9 xs:h-10 border-primary/20 hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-4 -right-4 w-20 h-20 xs:w-24 xs:h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 xs:w-32 xs:h-32 bg-secondary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
