import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

async function getStories() {
  try {
    const dbClient = await client.connect();
    const db = dbClient.db("adventure_game_db");
    const stories = await db.collection('story_nodes').find({}).toArray();
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

export { getStories as GET }; 