import { useState } from "react";
import { generatePrompt } from "@/utils/ai-prompts";
import { analyzeGithubRepo } from "@/utils/github-service";
import {
  cleanAndFormatResponse,
  formatStreamingChunk,
  finalizeStreamingResponse,
} from "@/utils/formatting";

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatGithubAnalysis = async (repoData: {
    name: string;
    description: string;
    languages: { [key: string]: number };
    structure: Array<{ type: string; path: string }>;
    readme?: string;
    packageJson?: {
      dependencies?: { [key: string]: string };
      scripts?: { [key: string]: string };
    };
  }) => {
    const formatStructure = (items: Array<{ type: string; path: string }>) => {
      const tree = items
        .sort((a, b) => {
          if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
          return a.path.localeCompare(b.path);
        })
        .map((item) => {
          const parts = item.path.split("/");
          const depth = parts.length - 1;
          const prefix = "  ".repeat(depth);
          const name = parts.pop();
          const icon = item.type === "dir" ? "{icon=Folder}" : "{icon=File}";
          const suffix = item.path.endsWith(".test.ts")
            ? " {icon=TestTube}"
            : item.path.endsWith(".json")
            ? " {icon=Braces}"
            : item.path.endsWith(".md")
            ? " {icon=FileText}"
            : item.path.endsWith(".css") || item.path.endsWith(".scss")
            ? " {icon=Palette}"
            : item.path.endsWith(".tsx") || item.path.endsWith(".jsx")
            ? " {icon=Code2}"
            : item.path.endsWith(".ts") || item.path.endsWith(".js")
            ? " {icon=FileCode}"
            : "";

          const namePadded = `${name}${suffix}`.padEnd(30);
          return `│ ${prefix}${icon} ${namePadded}`;
        })
        .join("\n");

      return tree;
    };

    const formatLanguageBar = (percentage: number) => {
      const blocks = 20;
      const filled = Math.round((percentage / 100) * blocks);
      return `${"█".repeat(filled)}${"░".repeat(blocks - filled)}`;
    };

    // Generate AI interpretation
    const generateAIAnalysis = async () => {
      const projectContext = `
        Project Name: ${repoData.name}
        Description: ${repoData.description}
        Main Technologies: ${Object.keys(repoData.languages).join(", ")}
        Key Dependencies: ${
          repoData.packageJson?.dependencies
            ? Object.keys(repoData.packageJson.dependencies).join(", ")
            : "None"
        }
        Project Structure: ${repoData.structure.map((s) => s.path).join(", ")}
        README Content: ${repoData.readme || "No README"}

        Please use markdown-style bold (**word**) for important terms and key concepts in your analysis.
      `;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a technical project analyzer. Provide a concise but insightful analysis of this project's purpose, architecture, and technical decisions. Use markdown bold (**word**) for important terms and key concepts.",
            },
            {
              role: "user",
              content: projectContext,
            },
          ],
        }),
      });

      if (!response.ok) return "AI analysis unavailable";
      const data = await response.json();

      // Process the AI response to handle bold text
      const processedContent = data.choices[0].message.content
        .split("\n")
        .map((line: string) => line.replace(/\*\*(.*?)\*\*/g, "{bold=$1}"))
        .join("\n");

      return processedContent;
    };

    const aiAnalysis = await generateAIAnalysis();

    return `# {icon=Git} Project Analysis: ${repoData.name}
${repoData.description}

## {icon=Brain} AI Project Interpretation
┌─────────────────────────────────────────────────────┐
│ ${aiAnalysis.split("\n").join("\n│ ")}
└─────────────────────────────────────────────────────┘

## {icon=FolderTree} Project Structure
┌────────────────────────────────────────────────────┐
${formatStructure(repoData.structure)}
└────────────────────────────────────────────────────┘

## {icon=Terminal} Development Commands
┌──────────────────────────────────────────────────────┐
${
  repoData.packageJson?.scripts
    ? Object.entries(repoData.packageJson.scripts)
        .map(
          ([script, command]) =>
            `│ {icon=Play} ${script.padEnd(15)} ⎯⎯⎯▶ ${command}`
        )
        .join("\n│\n")
    : "│ {icon=AlertCircle} No development scripts configured"
}
└──────────────────────────────────────────────────────┘

## {icon=Sparkles} Project Overview
┌─────────────────────────────────────────────────────┐
│ {icon=Info} Project Analysis                        │
├─────────────────────────────────────────────────────┤
│  ${
      repoData.structure.some((s) => s.path.includes("pages"))
        ? "{icon=Layout} Next.js Application"
        : repoData.structure.some((s) => s.path.includes("components"))
        ? "{icon=Boxes} React Application"
        : "{icon=Box} Standard Application"
    }                                                   │
├─────────────────────────────────────────────────────┤
│ {icon=Code2} Technology Stack                       │
├─────────────────────────────────────────────────────┤
${Object.entries(repoData.languages)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .slice(0, 3)
  .map(([lang, bytes]) => {
    const percentage = (
      ((bytes as number) /
        Object.values(repoData.languages).reduce(
          (a, b) => (a as number) + (b as number),
          0
        )) *
      100
    ).toFixed(1);
    return `│  {icon=CircleDot} ${lang.padEnd(15)} ${formatLanguageBar(
      parseFloat(percentage)
    )} ${percentage}%`;
  })
  .join("\n")}
│                                                     │
├─────────────────────────────────────────────────────┤
│ {icon=CheckCircle} Project Status                   │
├─────────────────────────────────────────────────────┤
│  {icon=TestTube} Testing     ${
      repoData.structure.some((s) => s.path.includes("test"))
        ? "{icon=Check} Implemented"
        : "{icon=X} Missing"
    }                          │
│  {icon=FileText} Docs       ${
      repoData.readme ? "{icon=Check} Available" : "{icon=X} Missing"
    }                          │
│  {icon=Package} Packages    ${
      repoData.packageJson?.dependencies
        ? `{icon=Check} ${
            Object.keys(repoData.packageJson.dependencies).length
          } dependencies`
        : "{icon=X} None"
    }                │
│  {icon=Git} Version     ${
      repoData.structure.some((s) => s.path.includes(".git"))
        ? "{icon=Check} Git initialized"
        : "{icon=X} No version control"
    }                │
├─────────────────────────────────────────────────────┤
│ {icon=Zap} Quick Stats                              │
├─────────────────────────────────────────────────────┤
│  {icon=Files} Total Files: ${repoData.structure
      .filter((s) => s.type === "file")
      .length.toString()
      .padEnd(8)} {icon=Folder} Directories: ${
      repoData.structure.filter((s) => s.type === "dir").length
    }        │
│  {icon=Code} Languages: ${Object.keys(repoData.languages)
      .length.toString()
      .padEnd(11)} {icon=Package} Dependencies: ${
      repoData.packageJson?.dependencies
        ? Object.keys(repoData.packageJson.dependencies).length
        : 0
    }        │
└─────────────────────────────────────────────────────┘`;
  };

  const generateResponse = async (
    prompt: string,
    type: "chat" | "analyze" | "generate" | "github"
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (type === "github") {
        const repoUrl = prompt
          .replace("Analyze this GitHub repository: ", "")
          .trim();
        const repoData = await analyzeGithubRepo(repoUrl);
        return await formatGithubAnalysis(repoData);
      }

      const promptConfig = generatePrompt(type, prompt);

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptConfig),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      // Clean and format the response
      return cleanAndFormatResponse(content);
    } catch (error) {
      setError("Failed to generate response. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateStreamingResponse = async (
    prompt: string,
    type: "chat" | "analyze" | "generate" | "github",
    onChunk?: (chunk: string) => void
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (type === "github") {
        const repoUrl = prompt
          .replace("Analyze this GitHub repository: ", "")
          .trim();
        const repoData = await analyzeGithubRepo(repoUrl);
        const result = await formatGithubAnalysis(repoData);
        onChunk?.(result);
        return result;
      }

      const promptConfig = generatePrompt(type, prompt);

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...promptConfig,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate streaming response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (!reader) {
        throw new Error("Response body is not readable");
      }

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                const formattedChunk = formatStreamingChunk(parsed.text);
                fullText += formattedChunk;
                onChunk?.(formattedChunk);
              }
            } catch (e) {
              // Skip parsing errors for malformed JSON
              console.error("Error parsing chunk:", e);
            }
          }
        }
      }

      // Finalize the response with proper formatting
      const finalText = finalizeStreamingResponse(fullText);
      return finalText;
    } catch (error) {
      console.error("Streaming error:", error);
      setError("Failed to generate streaming response. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateResponse, generateStreamingResponse, isLoading, error };
}
