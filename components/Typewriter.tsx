"use client";

import { useTypewriter } from "@/utils/typewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter = ({ text, speed = 100, onComplete }: TypewriterProps) => {
  const { displayedText, showCursor } = useTypewriter(text, speed, onComplete);

  return (
    <p className="text-gray-600 dark:text-gray-300">
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </p>
  );
};

export default Typewriter;
