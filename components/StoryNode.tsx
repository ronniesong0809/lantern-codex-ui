import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

type NodeData = Record<string, unknown> & {
  id: string,
  position: {
    x: number,
    y: number
  },
  label: string;
  content: string;
  isEnding: boolean;
  data: NodeData;
};

const StoryNode = ({ data }: NodeProps<NodeData>) => {
  return (
    <div className="px-4 py-2 w-40 h-40 shadow-md rounded-md bg-white border-2 max-w-md">
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div className="flex flex-col">
        <div className={`font-bold ${data.isEnding ? 'text-red-600' : 'text-gray-800'}`}>
          {data.id}. {data.label}
        </div>
        <div className="text-gray-500 text-sm mt-2">
          {data.content.length > 40 ? `${data.content.substring(0, 40)}...` : data.content}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
};

export default memo(StoryNode); 