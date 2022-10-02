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
    const rawImg = body.img;

    console.log(body);
    const apiRes = await fetch('http://7d2d-34-142-217-42.ngrok.io/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            base64: rawImg
        })
    });
    const json = await apiRes.json();
    console.log(json);

    res.status(200).end();
    return;

    let note : Note = {
        ...JSON.parse(req.body),
        score: 0,
    }

    try {
        await db.collection('notes')
            .insertOne(note);
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}
