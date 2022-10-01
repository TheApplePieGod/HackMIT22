import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }
    const client = await clientPromise;
    const db = client.db('prod');

    let note : Note = {
        ...req.body,
        score: 0,
        children: []
    }

    try {
        await db.collection('notes')
            .insertOne(note);
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}
