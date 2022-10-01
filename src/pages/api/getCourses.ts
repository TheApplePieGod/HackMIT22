import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (_: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db('prod');

    const notes = await db.collection('courses').find({}).toArray();

    res.status(200).json(notes);
}
