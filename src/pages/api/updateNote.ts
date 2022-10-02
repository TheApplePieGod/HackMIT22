import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }
    const client = await clientPromise;
    const db = client.db('prod');

    const body = JSON.parse(req.body);
    const id = body._id;
    const newTitle = body.title;
    const newChildren = body.children;

    try {
        await db.collection('notes')
            .updateOne({
                _id: id
            }, {
                $set: {
                    title: newTitle,
                    children: newChildren
                }
            });
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}
