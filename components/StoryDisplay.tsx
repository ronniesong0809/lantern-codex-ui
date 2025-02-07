"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Typewriter from "./Typewriter";
import { useStoryState } from "@/hooks/useStoryState";
import { StoryNode, StoryOption } from "@/types/story";

const StoryDisplay = ({ stories }: { stories: StoryNode[] }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const {
    storyState,
    setCurrentNode
  } = useStoryState();

  const currentStory = stories.find(s => s.node_id === storyState.currentNodeId);
  const visitedStories = stories.filter(s => storyState.visitedNodes.has(s.node_id))
    .sort((a, b) => Array.from(storyState.visitedNodes).indexOf(a.node_id) - Array.from(storyState.visitedNodes).indexOf(b.node_id));

  const handleOptionClick = (option: StoryOption) => {
    setCurrentNode(option.nextId);
    setShowOptions(false);
  };

  const handleComplete = useCallback(() => {
    setShowOptions(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [storyState.currentNodeId, showOptions]);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 p-4">
      <div className="h-full max-w-3xl mx-auto space-y-4 overflow-y-auto pb-4">
        {(showHistory ? visitedStories : [currentStory]).map((story, index) => (
          <Card key={story.node_id} className="bg-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{story.title}</span>
                {index === 0 && currentStory.ending && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    {showHistory ? 'story' : 'history'}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {story === currentStory && !showHistory ? (
                <>
                  <Typewriter 
                    text={story.content} 
                    onComplete={handleComplete}
                  />
                  {showOptions && story.options.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4">
                      {story.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="secondary"
                          onClick={() => handleOptionClick(option)}
                          className="text-left"
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  )}
                  {story.ending && (
                    <div className="mt-4 text-center text-muted-foreground">
                      END
                    </div>
                  )}
                </>
              ) : (
                <div>{story.content}</div>
              )}
            </CardContent>
          </Card>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default StoryDisplay; 