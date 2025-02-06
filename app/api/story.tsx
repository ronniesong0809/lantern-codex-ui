import client from "../../lib/mongodb";
import { NextApiResponse } from 'next';

export default async (res: NextApiResponse) => {
    try {
        const db = client.db("adventure_game_db");
        const stories = await db
            .collection("story_nodes")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        res.json(stories);
    } catch (e) {
        console.error(e);
    }
}