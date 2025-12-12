import React, { useEffect, useState } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  onComplete?: () => void;
}

/**
 * Component that displays text with a typing effect
 * Shows text appearing character by character in real-time
 */
export function StreamingText({
  text,
  speed = 10,
  onComplete,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      } else {
        onComplete?.();
      }
    };

    typeNextCharacter();

    return () => clearTimeout(timeoutId);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
}

interface StreamingParagraphProps {
  children: React.ReactNode;
  isStreaming: boolean;
}

/**
 * Wrapper component for streaming display
 * Shows content with typing effect when streaming is active
 */
export function StreamingParagraph({
  children,
  isStreaming,
}: StreamingParagraphProps) {
  if (!isStreaming) {
    return <>{children}</>;
  }

  // When streaming, show text with animation
  return <span className="animate-pulse">{children}</span>;
}
