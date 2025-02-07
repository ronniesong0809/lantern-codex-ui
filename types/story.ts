export interface StoryOption {
  text: string;
  nextId: string;
}

export interface StoryResponse {
  story_id: string;
  background: string;
  nodeNumber: number;
  created_at: string;
  chapters: StoryNode[];
}

export interface StoryNode {
  story_background: string;
  node_id: string;
  title: string;
  content: string;
  options: StoryOption[];
  ending: boolean;
}

export interface StoryState {
  currentNodeId: string;
  visitedNodes: Set<string>;
} 