import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }
    const client = await clientPromise;
    const db = client.db('prod');

    const fromId = req.body.from;
    const toId = req.body.to;

    try {
        await db.collection('notes')
            .updateOne({
                _id: fromId
            },
            {
                $push: {
                    children: toId
                }
            });
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}
