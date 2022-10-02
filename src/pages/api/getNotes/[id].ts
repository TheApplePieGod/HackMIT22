import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db('prod');

    const { id } = req.query;

    const course = await db.collection('courses')
        .findOne({
            _id: id
        });
    const notes = await db.collection('notes')
        .find({
            course: id
        }).toArray();

    res.status(200).json({ course, notes });
}
