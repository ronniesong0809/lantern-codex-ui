"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Typewriter from "./Typewriter";

interface StoryOption {
  _id: string;
  text: string;
  nextId: string;
}

interface Story {
  _id: string;
  node_id: string;
  title: string;
  content: string;
  options: StoryOption[];
}

const StoryDisplay = ({ stories }: { stories: Story[] }) => {
  const [states, setStates] = useState(["1"]);
  const [showOptions, setShowOptions] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (nodeId: string) => {
    setStates([nodeId]);
    setShowOptions(false);
  };

  const handleComplete = useCallback(() => {
    setShowOptions(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [states, showOptions]);

  return (
    <div className="fixed inset-x-0 bottom-0 p-4">
      <div className="max-w-2xl mx-auto space-y-4 max-h-[80vh] overflow-y-auto pb-4">
        {stories.map((story, index) => (
          states.includes(story.node_id) ? (
            <Card key={`story-${story._id || index}`} className="bg-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Typewriter 
                  text={story.content} 
                  onComplete={handleComplete}
                />
                {showOptions && story.options.length > 0 && (
                  <div className="flex flex-col gap-2 mt-4">
                    {story.options.map((option, optIndex) => (
                      <Button
                        key={`option-${option._id || optIndex}`}
                        variant="secondary"
                        onClick={() => handleOptionClick(option.nextId)}
                        className="text-left"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default StoryDisplay; 