import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db('prod');

    const { id } = req.query;

    const note = await db.collection('notes')
        .findOne({
            _id: id
        });
    const ancestors = await db.collection('notes')
        .find({
            children: id
        }).toArray();
    res.status(200).json({ note, ancestors });
}
