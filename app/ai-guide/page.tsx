"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Loader2,
  Command,
  MessageSquare,
  ChevronDown,
  GitBranch,
  Sparkles,
  Feather,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAI } from "@/hooks/useAI";
import { FeaturesGrid } from "@/components/features-grid";
import { AIResponseRenderer } from "@/components/ai-response-renderer";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/loading-animation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AIGuidePage() {
  const { generateResponse, isLoading, error } = useAI();
  const [activeTab, setActiveTab] = useState<
    "chat" | "analyze" | "generate" | "github"
  >("chat");
  const [input, setInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [response, setResponse] = useState("");
  const aiSectionRef = useRef<HTMLDivElement>(null);
  const [isFineTuning, setIsFineTuning] = useState(false);

  useEffect(() => {
    const pendingPrompt = localStorage.getItem("pendingPrompt");
    const promptType = localStorage.getItem("promptType");

    if (pendingPrompt && promptType) {
      // Clear the stored prompt
      localStorage.removeItem("pendingPrompt");
      localStorage.removeItem("promptType");

      // Generate response for the stored prompt
      generateResponse(pendingPrompt, promptType as "chat" | "analyze");
    }
  }, [generateResponse]);

  const scrollToAI = () => {
    aiSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setResponse(""); // Clear previous response
  };

  const handleQuickPrompt = async (
    prompt: string,
    type: "chat" | "analyze" | "generate" | "github"
  ) => {
    try {
      setActiveTab(type);
      setInput(prompt);

      // Scroll to AI section first
      scrollToAI();

      // Generate response with error handling
      const result = await generateResponse(prompt, type);
      if (result) {
        setResponse(result);
      }
    } catch (err) {
      console.error("Error processing quick prompt:", err);
      setResponse(
        "Sorry, there was an error processing your request. Please try again."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const result = await generateResponse(input, activeTab);
      if (result) {
        setResponse(result);
      }
    } catch (err) {
      console.error("Error generating response:", err);
      setResponse(
        "Sorry, there was an error processing your request. Please try again."
      );
    }
  };

  const handleGithubAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;

    try {
      const result = await generateResponse(
        `Analyze this GitHub repository: ${githubUrl}`,
        "github"
      );
      if (result) {
        setResponse(result);
      }
    } catch (err) {
      console.error("Error analyzing GitHub repo:", err);
      setResponse(
        "Sorry, there was an error analyzing the repository. Please check the URL and try again."
      );
    }
  };

  const clearResponse = () => {
    setResponse(""); // Clear only the response
  };

  const handleFineTune = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text to fine-tune");
      return;
    }

    try {
      setIsFineTuning(true);
      const prompt = `Improve this text by fixing grammar, spelling, and clarity issues. Return only the improved text without any explanations, formatting, or additional content: "${input}"`;
      const result = await generateResponse(prompt, "chat");
      if (result) {
        // Clean up the response by removing any quotes and extra formatting
        const cleanedResult = result
          .replace(/^["']|["']$/g, "") // Remove surrounding quotes
          .replace(/^Here is.*?:\n*/i, "") // Remove any introductory text
          .replace(/^The improved.*?:\n*/i, "")
          .trim();

        setInput(cleanedResult);
        toast.success("Text has been fine-tuned!");
      }
    } catch (err) {
      console.error("Error fine-tuning text:", err);
      toast.error("Failed to fine-tune text. Please try again.");
    } finally {
      setIsFineTuning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-32 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-3xl" />
        </div>
        <div className="container relative px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6"
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <Badge
                variant="outline"
                className="px-3 md:px-4 py-1 md:py-1.5 rounded-full gap-1.5 text-sm font-medium group"
              >
                AI Guide
                <Sparkles className="w-4 h-4 group-hover:animate-[pulse_1.5s_ease-in-out_infinite]" />
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Enhance Your Portfolio with AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground px-4 md:px-0">
              Learn how to leverage AI to improve your portfolio, generate
              content, and get intelligent insights.
            </p>
            <Button
              onClick={scrollToAI}
              size="lg"
              className="mt-6 md:mt-8 group"
            >
              Get Started
              <ChevronDown className="ml-2 w-4 h-4 group-hover:animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FeaturesGrid
              onQuickPrompt={handleQuickPrompt}
              onStartAI={scrollToAI}
            />
          </motion.div>
        </div>
      </section>

      {/* Interactive AI Section */}
      <section
        ref={aiSectionRef}
        className="py-12 md:py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="container px-4 md:px-6">
          <Card className="p-4 md:p-6 bg-white dark:bg-zinc-900 border-primary/20">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
              {(["chat", "analyze", "generate", "github"] as const).map(
                (tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    onClick={() => setActiveTab(tab)}
                    className="gap-2 flex-1 md:flex-none"
                  >
                    {tab === "chat" && <MessageSquare className="w-4 h-4" />}
                    {tab === "analyze" && <Brain className="w-4 h-4" />}
                    {tab === "generate" && <Code2 className="w-4 h-4" />}
                    {tab === "github" && <GitBranch className="w-4 h-4" />}
                    <span className="hidden md:inline">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </Button>
                )
              )}
            </div>

            {/* GitHub Form */}
            {activeTab === "github" ? (
              <form onSubmit={handleGithubAnalysis} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter GitHub repository URL"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="gap-2 w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden md:inline">Analyzing...</span>
                        <span className="inline md:hidden">Loading...</span>
                      </>
                    ) : (
                      <>
                        <GitBranch className="w-4 h-4" />
                        <span className="hidden md:inline">Analyze Repo</span>
                        <span className="inline md:hidden">Analyze</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder={`${
                      activeTab === "chat"
                        ? "Ask anything about the portfolio..."
                        : activeTab === "analyze"
                        ? "Enter content to analyze..."
                        : "Describe what you want to generate..."
                    }`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={cn(
                      "min-h-[100px] md:min-h-[120px] pr-16",
                      isFineTuning &&
                        "bg-primary/5 transition-colors duration-300"
                    )}
                    disabled={isFineTuning}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleFineTune}
                    className="absolute top-2 right-4 h-10 w-10 hover:bg-primary/5 group"
                    disabled={isLoading || isFineTuning}
                  >
                    <Feather
                      className={cn(
                        "h-5 w-5 transition-all duration-200",
                        isFineTuning
                          ? "text-primary animate-pulse"
                          : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                      )}
                    />
                    <span className="sr-only">Fine-tune text</span>
                  </Button>
                  {isFineTuning && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="h-full w-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse rounded-md" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearResponse}
                    className="w-full md:w-auto"
                  >
                    Clear Response
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="gap-2 w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden md:inline">Processing...</span>
                        <span className="inline md:hidden">Loading...</span>
                      </>
                    ) : (
                      <>
                        <Command className="w-4 h-4" />
                        {activeTab === "chat"
                          ? "Send"
                          : activeTab === "analyze"
                          ? "Analyze"
                          : "Generate"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Response Section */}
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <>
                {error && (
                  <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm md:text-base">
                    {error}
                  </div>
                )}

                {response && (
                  <div className="mt-4 md:mt-6">
                    <AIResponseRenderer content={response} type={activeTab as "chat" | "analyze" | "generate"} />
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
