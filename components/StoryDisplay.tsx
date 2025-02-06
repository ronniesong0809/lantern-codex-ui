"use client";

import { useState, useCallback } from 'react';
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

  const handleOptionClick = (nodeId: string) => {
    setStates([nodeId]);
    setShowOptions(false);
  };

  const handleComplete = useCallback(() => {
    setShowOptions(true);
  }, []);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {stories.map((story, index) => (
        states.includes(story.node_id) ? (
          <Card key={`story-${story._id || index}`}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typewriter 
                text={story.content} 
                onComplete={handleComplete}
              />
              {showOptions && story.options.length > 0 && (
                <div className="flex flex-col gap-2">
                  {story.options.map((option, optIndex) => (
                    <Button
                      key={`option-${option._id || optIndex}`}
                      variant="secondary"
                      onClick={() => handleOptionClick(option.nextId)}
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
    </div>
  );
};

export default StoryDisplay; 