import { useState, useCallback } from 'react';
import { StoryState } from '@/types/story';

const INITIAL_STORY_STATE: StoryState = {
  currentNodeId: "0",
  visitedNodes: new Set(["0"])
};

export const useStoryState = () => {
  const [storyState, setStoryState] = useState<StoryState>(INITIAL_STORY_STATE);

  const setCurrentNode = useCallback((nodeId: string) => {
    setStoryState(prev => ({
      ...prev,
      currentNodeId: nodeId,
      visitedNodes: new Set([...prev.visitedNodes, nodeId])
    }));
  }, []);

  return {
    storyState,
    setCurrentNode
  };
}; 