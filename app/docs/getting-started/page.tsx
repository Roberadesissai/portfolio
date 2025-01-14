"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Lightbulb,
  MessageSquare,
  Rocket,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function GettingStartedPage() {
  const router = useRouter();

  const tryPrompt = (prompt: string, type: "chat" | "analyze") => {
    // Store the prompt in localStorage to be picked up by the AI chat page
    localStorage.setItem("pendingPrompt", prompt);
    localStorage.setItem("promptType", type);
    router.push("/ai-guide");
  };

  return (
    <div className="container max-w-7xl mx-auto pt-40 pb-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Link href="/ai-guide" className="hover:text-primary transition-colors">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to AI Guide
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Getting Started with AI Guide</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to effectively use our AI-powered development assistant
          </p>
        </div>

        <Separator />

        {/* Quick Start Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            Quick Start
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat with AI
              </h3>
              <p className="text-muted-foreground">
                Start a conversation with our AI to get help with coding,
                debugging, or understanding concepts.
              </p>
              <code className="block bg-muted p-4 rounded-lg">
                &quot;How do I implement authentication in Next.js?&quot;
              </code>
              <Button
                onClick={() =>
                  tryPrompt(
                    "How do I implement authentication in Next.js?",
                    "chat"
                  )
                }
                className="w-full"
              >
                Try this prompt
              </Button>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Code Analysis
              </h3>
              <p className="text-muted-foreground">
                Get detailed analysis of your code or GitHub repositories.
              </p>
              <code className="block bg-muted p-4 rounded-lg">
                &quot;Analyze this GitHub repository: vercel/next.js&quot;
              </code>
              <Button
                onClick={() =>
                  tryPrompt(
                    "Analyze this GitHub repository: vercel/next.js",
                    "analyze"
                  )
                }
                className="w-full"
              >
                Try this analysis
              </Button>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Documentation"
              description="Access comprehensive documentation and examples"
            />
            <FeatureCard
              icon={<Code2 className="w-5 h-5" />}
              title="Code Generation"
              description="Generate code snippets and boilerplate"
            />
            <FeatureCard
              icon={<Lightbulb className="w-5 h-5" />}
              title="Best Practices"
              description="Learn coding best practices and patterns"
            />
          </div>
        </section>

        {/* Tips Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Pro Tips
          </h2>
          <Card className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Be specific in your questions for better responses
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Use code blocks when sharing code snippets
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Explore different analysis types for varied insights
              </li>
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
