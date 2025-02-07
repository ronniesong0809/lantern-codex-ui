'use server';

import { StoryResponse } from '@/types/story';
import FlowClient from '@/components/FlowClient';

type Params = Promise<{ id: string }>

async function getData(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/story/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default async function FlowPage( props: { params: Params }) {
  const params = await props.params;
  const storyData: StoryResponse = await getData(params.id);
  return <FlowClient initialData={storyData} />;
} 