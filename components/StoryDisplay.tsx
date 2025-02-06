"use client";

import { useState } from 'react';
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

  const handleOptionClick = (nodeId: string) => {
    setStates([nodeId]);
  };

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        states.includes(story.node_id) ? (
          <div key={`story-${story._id || index}`} className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-bold dark:text-white">{story.title}</h3>
            <Typewriter text={story.content} />
            {story.options.length > 0 && <div className="flex flex-col mt-2 gap-2">
              {story.options.map((option, optIndex) => (
                <button
                  key={`option-${option._id || optIndex}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleOptionClick(option.nextId)}
                >
                  {option.text}
                </button>
              ))}
            </div>}
          </div>
        ) : null
      ))}
    </div>
  );
};

export default StoryDisplay; 