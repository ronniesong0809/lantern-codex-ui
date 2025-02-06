"use client";

import { useTypewriter } from "@/utils/typewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter = ({ text, speed = 150 }: TypewriterProps) => {
  const { displayedText, showCursor } = useTypewriter(text, speed);

  return (
    <p className="text-gray-600 dark:text-gray-300">
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </p>
  );
};

export default Typewriter;
