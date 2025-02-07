'use client';

import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  NodeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StoryResponse } from '@/types/story';
import StoryNode from '@/components/StoryNode';
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

type NodeData = Record<string, unknown> & {
  label: string;
  content: string;
  isEnding: boolean;
};

const nodeTypes = {
  storyNode: StoryNode,
} as NodeTypes;

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.spacing.nodeNode': '80',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
};

interface FlowClientProps {
  initialData: StoryResponse;
}

export default function FlowClient({ initialData }: FlowClientProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(true);

  const getLayoutedElements = useCallback(async (nodes: Node<NodeData>[], edges: Edge[]) => {
    const graph = {
      id: 'root',
      layoutOptions: elkOptions,
      children: nodes.map((node) => ({
        ...node,
        width: 200,
        height: 200,
        ports: [
          { id: `${node.id}-source`, properties: { side: 'WEST' } },
          { id: `${node.id}-target`, properties: { side: 'EAST' } },
        ],
      })),
      edges: edges.map((edge) => ({
        ...edge,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    const layoutedGraph = await elk.layout(graph);

    return {
      nodes: nodes.map((node) => {
        const layoutNode = layoutedGraph.children?.find((n) => n.id === node.id);
        if (layoutNode) {
          return {
            ...node,
            position: { x: layoutNode.x || 0, y: layoutNode.y || 0 },
          };
        }
        return node;
      }),
      edges,
    };
  }, []);

  const transformStoryToFlow = useCallback(async (story: StoryResponse) => {
    const newNodes: Node<NodeData>[] = [];
    const newEdges: Edge[] = [];
    
    story.chapters.forEach((chapter) => {
      newNodes.push({
        id: chapter.node_id,
        type: 'storyNode',
        position: { x: 0, y: 0 },
        data: { 
          id: chapter.node_id,
          label: chapter.title,
          content: chapter.content,
          isEnding: chapter.ending
        },
      });

      chapter.options.forEach((option) => {
        newEdges.push({
          id: `${chapter.node_id}-${option.nextId}`,
          source: chapter.node_id,
          target: option.nextId,
          label: option.text,
          animated: true,
          style: { stroke: '#888' },
          labelStyle: { fontSize: 11 },
          labelBgStyle: { fill: '#ffffff', opacity: 0.5 },
        });
      });
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
      newNodes,
      newEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setLoading(false);
  }, [getLayoutedElements, setNodes, setEdges]);

  useEffect(() => {
    transformStoryToFlow(initialData);
  }, [initialData, transformStoryToFlow]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading flow visualization...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
} 