import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Copy,
  Check,
  Zap,
  Target,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AIResponseRendererProps {
  content: string;
  type: "chat" | "analyze" | "generate";
}

export function AIResponseRenderer({ content }: AIResponseRendererProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const iconMap: { [key: string]: React.ElementType } = {
    Code2: Code2,
    Zap: Zap,
    Target: Target,
    Link: LinkIcon,
    // Add other icons as needed
  };

  // Process code blocks first
  const processCodeBlocks = (text: string): (string | React.ReactElement)[] => {
    if (typeof text !== "string") return [];

    const parts: (string | React.ReactElement)[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const language = match[1] || "plaintext";
      const code = match[2].trim();
      const codeId = `${language}-${match.index}`;

      parts.push(
        <div
          key={codeId}
          className="my-4 overflow-hidden rounded-lg border border-primary/20"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-medium text-zinc-400">
                {language}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopiedCode(codeId);
                setTimeout(() => setCopiedCode(null), 2000);
              }}
              className="h-8 gap-2 text-zinc-400 hover:text-zinc-200"
            >
              {copiedCode === codeId ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <div className="bg-zinc-950">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
              showLineNumbers={true}
              wrapLines={false}
              wrapLongLines={false}
              useInlineStyles={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };
  // Process tables
  const processTable = (text: string): React.ReactElement | null => {
    if (!text.includes("|")) return null;

    const lines = text.trim().split("\n");
    const headers = lines[0]
      .split("|")
      .filter(Boolean)
      .map((h) => processText(h.trim()));
    const alignments = lines[1]
      ?.split("|")
      .filter(Boolean)
      .map((a) => {
        if (a.startsWith(":") && a.endsWith(":")) return "center";
        if (a.endsWith(":")) return "right";
        return "left";
      });
    const rows = lines.slice(2).map((row) =>
      row
        .split("|")
        .filter(Boolean)
        .map((cell) => cell.trim())
    );

    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-primary/10">
          <thead className="bg-primary/5">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left text-sm font-medium text-primary"
                  style={{ textAlign: alignments[i] }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-primary/5">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 text-sm text-muted-foreground"
                    style={{ textAlign: alignments[j] }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  // Add icon processing function
  const processIcons = (
    text: string | React.ReactElement
  ): React.ReactElement => {
    if (React.isValidElement(text)) return text;
    if (typeof text !== "string") return <>{text}</>;
    if (!text.includes("{icon=")) return <>{text}</>;

    const parts = text.split(/(\{icon=\w+\})/g);
    return (
      <>
        {parts.map((part, index) => {
          const match = part.match(/\{icon=(\w+)\}/);
          if (match) {
            const Icon = iconMap[match[1]];
            return Icon ? (
              <Icon key={index} className="inline-block w-4 h-4 mx-1" />
            ) : (
              ""
            );
          }
          return part;
        })}
      </>
    );
  };

  // Process links with icons
  const processLinks = (text: string): React.ReactElement => {
    if (!text.includes("[")) return <>{text}</>;

    const parts = text.split(/(\[[^\]]+\]\([^)]+\)\s*\{icon=\w+\})/g);

    return (
      <>
        {parts.map((part, index) => {
          const linkMatch = part.match(
            /\[([^\]]+)\]\(([^)]+)\)\s*\{icon=(\w+)\}/
          );

          if (linkMatch) {
            const [, text, url, iconName] = linkMatch;
            const Icon = iconMap[iconName];

            return (
              <Link
                key={index}
                href={url}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                {text}
                {Icon && <Icon className="w-4 h-4" />}
              </Link>
            );
          }

          return part;
        })}
      </>
    );
  };

  // Update the content processing
  const processContentByType = (text: string) => {
    if (typeof text !== "string") return null;

    const parts = processCodeBlocks(text);

    return parts.map((part, partIndex) => {
      if (typeof part !== "string") return part;

      const lines = part.split("\n");
      return (
        <div key={`part-${partIndex}`} className="space-y-4">
          {lines
            .map((line, lineIndex) => {
              // Skip empty lines
              if (!line.trim()) {
                return <div key={`empty-${partIndex}-${lineIndex}`} className="h-2" />;
              }

              // Process table
              if (line.includes("|")) {
                const tableContent = lines.slice(lineIndex).join("\n");
                const table = processTable(tableContent);
                if (table)
                  return React.cloneElement(table, {
                    key: `table-${lineIndex}`,
                  });
              }

              // Process bold headings (lines that are **text**)
              const boldHeadingMatch = line.match(/^\*\*([^*]+)\*\*(.*)$/);
              if (boldHeadingMatch) {
                const headingText = boldHeadingMatch[1];
                const restOfLine = boldHeadingMatch[2];
                const processedText = processText(headingText + restOfLine);
                
                return (
                  <motion.h4
                    key={`bold-heading-${partIndex}-${lineIndex}`}
                    className="font-bold text-lg text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lineIndex * 0.05 }}
                  >
                    {processedText}
                  </motion.h4>
                );
              }

              // Process bullet points (both * and - styles) with icons
              const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);
              if (bulletMatch) {
                const bulletText = bulletMatch[1];
                const processedLine = processIcons(processLinks(bulletText));
                return (
                  <motion.div
                    key={`bullet-${partIndex}-${lineIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lineIndex * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {processedLine}
                    </span>
                  </motion.div>
                );
              }

              // Process headings with icons
              if (line.startsWith("#")) {
                const headingMatch = line.match(/^#+/);
                if (!headingMatch) return null;

                const level = headingMatch[0].length;
                const text = line.slice(level + 1).trim();
                const processedText = processIcons(text);

                return (
                  <motion.h3
                    key={`heading-${partIndex}-${lineIndex}`}
                    className={`font-semibold flex items-center gap-2 ${
                      level === 1
                        ? "text-2xl"
                        : level === 2
                        ? "text-xl"
                        : "text-lg"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {processedText}
                  </motion.h3>
                );
              }

              // Regular text with icons and links
              return line.trim() ? (
                <p
                  key={`text-${partIndex}-${lineIndex}`}
                  className="text-muted-foreground"
                >
                  {processText(line)}
                </p>
              ) : null;
            })
            .filter(Boolean)}
        </div>
      );
    });
  };

  const processText = (
    text: string | React.ReactElement
  ): React.ReactElement => {
    if (React.isValidElement(text)) return text;
    if (typeof text !== "string") return <>{text}</>;

    // Handle markdown bold (**text**) patterns
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    
    // Match **text** patterns (greedy and non-greedy)
    const boldRegex = /\*\*([^*]+?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        parts.push(beforeText);
      }

      // Add bold text
      const boldText = match[1];
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold text-foreground">
          {boldText}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // If we found bold patterns, return them
    if (parts.length > 1) {
      return <>{parts}</>;
    }

    // If no bold patterns, check for custom {bold=text} format
    const customBoldRegex = /\{bold=([^}]+)\}/g;
    let customMatch;
    const customParts: (string | React.ReactElement)[] = [];
    let customLastIndex = 0;

    while ((customMatch = customBoldRegex.exec(text)) !== null) {
      if (customMatch.index > customLastIndex) {
        customParts.push(text.slice(customLastIndex, customMatch.index));
      }

      const boldText = customMatch[1];
      customParts.push(
        <span key={`custom-bold-${customMatch.index}`} className="font-bold text-foreground">
          {boldText}
        </span>
      );

      customLastIndex = customMatch.index + customMatch[0].length;
    }

    if (customLastIndex < text.length) {
      customParts.push(text.slice(customLastIndex));
    }

    if (customParts.length > 1) {
      return <>{customParts}</>;
    }

    // If no bold found, return as-is
    return <>{text}</>;
  };

  return <div className="space-y-4">{processContentByType(content)}</div>;
}
