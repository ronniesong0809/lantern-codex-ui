"use client";

import { useTypewriter } from "@/utils/typewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter = ({ text, speed = 150, onComplete }: TypewriterProps) => {
  const { displayedText, showCursor, isComplete } = useTypewriter(text, speed, onComplete);

  return (
    <p className="text-gray-600 dark:text-gray-300">
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </p>
  );
};

export default Typewriter;
