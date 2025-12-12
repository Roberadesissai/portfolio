/**
 * Comprehensive markdown formatter for display
 * Converts markdown syntax to clean, rendered text
 */
export function formatMarkdownForDisplay(text: string): string {
  if (!text) return "";

  let formatted = text;

  // Remove markdown bold markers but keep the text bold (handled by renderer)
  // **text** stays as **text** for the renderer to process

  // Convert markdown lists to clean bullet points
  // * item -> just keep item (the renderer will add bullets)
  // - item -> just keep item
  formatted = formatted.replace(/^\s*[-*]\s+/gm, "");

  // Convert numbered lists
  // 1. item -> just keep item
  formatted = formatted.replace(/^\s*\d+\.\s+/gm, "");

  // Clean up extra spaces
  formatted = formatted.replace(/\n\n\n+/g, "\n\n");

  return formatted.trim();
}

/**
 * Safely processes markdown without breaking formatting
 * Used to prepare content for streaming display
 */
export function processMarkdownSafely(text: string): string {
  if (!text) return "";

  // Keep markdown formatting intact for renderer processing
  // Just ensure it's valid markdown
  let processed = text;

  // Fix multiple asterisks
  processed = processed.replace(/\*{3,}/g, "**");

  // Ensure code blocks are properly closed
  const backtickCount = (processed.match(/```/g) || []).length;
  if (backtickCount % 2 !== 0) {
    processed = processed + "\n```";
  }

  return processed;
}

/**
 * Interface for formatted text with styling information
 */
export interface FormattedText {
  text: string;
  isBold: boolean;
  isItalic: boolean;
  isCode: boolean;
  isLink: boolean;
  originalMarkdown: string;
}

/**
 * Validates and corrects markdown formatting in text
 * Fixes common issues like mismatched bold markers, odd asterisks, etc.
 */
export function validateAndFixMarkdown(text: string): string {
  let corrected = text;

  // Fix triple or more asterisks (reduce to double for bold)
  corrected = corrected.replace(/\*{3,}/g, "**");

  // Count bold markers (**)
  const boldMatches = corrected.match(/\*\*/g) || [];
  const boldCount = boldMatches.length;

  // Count backticks for code
  const backtickMatches = corrected.match(/(?<!`)`(?!`)/g) || [];
  const backtickCount = backtickMatches.length;

  // Fix unclosed bold if odd number
  if (boldCount % 2 !== 0) {
    corrected = corrected + "**";
  }

  // Fix unclosed backticks if odd number
  if (backtickCount % 2 !== 0) {
    corrected = corrected + "`";
  }

  // Fix triple backticks (code blocks)
  const tripleBacktickMatches = corrected.match(/```/g) || [];
  const tripleBacktickCount = tripleBacktickMatches.length;
  
  if (tripleBacktickCount % 2 !== 0) {
    corrected = corrected + "```";
  }

  return corrected;
}

/**
 * Fixes incomplete markdown patterns
 */
function fixIncompleteMarkdown(
  text: string,
  marker: string,
  type: "bold" | "italic" | "code"
): string {
  // Escape special regex characters
  const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  
  // Count occurrences of the marker
  const markerCount = (text.match(new RegExp(escapedMarker, "g")) || []).length;

  // If odd number of markers, add one at the end
  if (markerCount % 2 !== 0) {
    return text + marker;
  }

  return text;
}

/**
 * Ensures markdown formatting is properly closed
 */
export function ensureClosedMarkdown(text: string): string {
  let result = text;

  // Only fix obvious issues - don't over-process
  // Check for unclosed bold markers
  const boldCount = (result.match(/\*\*/g) || []).length;
  if (boldCount % 2 !== 0) {
    result = result + "**";
  }

  // Check for unclosed code blocks (triple backticks)
  const tripleBacktickCount = (result.match(/```/g) || []).length;
  if (tripleBacktickCount % 2 !== 0) {
    result = result + "```";
  }

  return result;
}

/**
 * Extracts formatting information from markdown text
 */
export function extractFormattedSegments(text: string): FormattedText[] {
  const segments: FormattedText[] = [];

  // Bold pattern: **text**
  const boldPattern = /\*\*([^*]+?)\*\*/g;
  let boldMatch;
  const boldMatches = [];

  while ((boldMatch = boldPattern.exec(text)) !== null) {
    boldMatches.push({
      index: boldMatch.index,
      length: boldMatch[0].length,
      content: boldMatch[1],
      type: "bold",
    });
  }

  // Italic pattern: *text*
  const italicPattern = /(?<!\*)\*([^*]+?)\*(?!\*)/g;
  let italicMatch;
  const italicMatches = [];

  while ((italicMatch = italicPattern.exec(text)) !== null) {
    italicMatches.push({
      index: italicMatch.index,
      length: italicMatch[0].length,
      content: italicMatch[1],
      type: "italic",
    });
  }

  // Code pattern: `code`
  const codePattern = /`([^`]+?)`/g;
  let codeMatch;
  const codeMatches = [];

  while ((codeMatch = codePattern.exec(text)) !== null) {
    codeMatches.push({
      index: codeMatch.index,
      length: codeMatch[0].length,
      content: codeMatch[1],
      type: "code",
    });
  }

  // Link pattern: [text](url)
  const linkPattern = /\[([^\]]+?)\]\(([^)]+?)\)/g;
  let linkMatch;
  const linkMatches = [];

  while ((linkMatch = linkPattern.exec(text)) !== null) {
    linkMatches.push({
      index: linkMatch.index,
      length: linkMatch[0].length,
      content: linkMatch[1],
      url: linkMatch[2],
      type: "link",
    });
  }

  return [
    ...boldMatches.map((m) => ({
      text: m.content,
      isBold: true,
      isItalic: false,
      isCode: false,
      isLink: false,
      originalMarkdown: `**${m.content}**`,
    })),
    ...italicMatches.map((m) => ({
      text: m.content,
      isBold: false,
      isItalic: true,
      isCode: false,
      isLink: false,
      originalMarkdown: `*${m.content}*`,
    })),
    ...codeMatches.map((m) => ({
      text: m.content,
      isBold: false,
      isItalic: false,
      isCode: true,
      isLink: false,
      originalMarkdown: `` + m.content + ``,
    })),
    ...linkMatches.map((m: any) => ({
      text: m.content,
      isBold: false,
      isItalic: false,
      isCode: false,
      isLink: true,
      originalMarkdown: `[${m.content}](${m.url})`,
    })),
  ];
}

/**
 * Converts markdown to HTML for rendering
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Bold: **text** → <strong>text</strong>
  html = html.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* → <em>text</em>
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>");

  // Code: `code` → <code>code</code>
  html = html.replace(/`([^`]+?)`/g, "<code>$1</code>");

  // Links: [text](url) → <a href="url">text</a>
  html = html.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, '<a href="$2">$1</a>');

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

/**
 * Cleans up response text and ensures proper formatting
 */
export function cleanAndFormatResponse(text: string): string {
  if (!text) return "";

  // First pass: fix obvious markdown issues
  let cleaned = validateAndFixMarkdown(text);

  // Ensure all major markdown is properly closed
  cleaned = ensureClosedMarkdown(cleaned);

  // Remove extra whitespace but preserve intentional line breaks
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  // Remove leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Formats a response with proper markdown handling
 * Used for streaming responses to ensure each chunk is properly formatted
 */
export function formatStreamingChunk(chunk: string): string {
  // Pass through chunks as-is from Gemini
  // Don't over-process - Gemini knows how to format markdown correctly
  return chunk;
}

/**
 * Finalizes a complete streaming response
 */
export function finalizeStreamingResponse(fullText: string): string {
  // Gemini already provides properly formatted markdown
  // Just trim whitespace
  return fullText.trim();
}

/**
 * Detects if text contains markdown formatting
 */
export function hasMarkdownFormatting(text: string): boolean {
  return /[\*\`\[\]()#]/.test(text);
}

/**
 * Gets the plain text version without markdown
 */
export function getPlainText(text: string): string {
  let plain = text;

  // Remove bold markers
  plain = plain.replace(/\*\*([^*]+?)\*\*/g, "$1");

  // Remove italic markers
  plain = plain.replace(/\*([^*]+?)\*/g, "$1");

  // Remove code markers
  plain = plain.replace(/`([^`]+?)`/g, "$1");

  // Remove links but keep the text
  plain = plain.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, "$1");

  return plain;
}
