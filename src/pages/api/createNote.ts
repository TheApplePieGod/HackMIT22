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

    const apiRes = await fetch('http://f609-34-66-160-157.ngrok.io/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            base64: rawImg
        })
    });
    
    if (!apiRes.ok) {
        res.status(500).end();
        return;
    }

    const json = await apiRes.json();
    console.log(json);

    const manims : Manim[] = [{
        pos: [json.box[0], json.box[1]],
        dim: [json.box[2] - json.box[0], json.box[3] - json.box[1]],
        img: json.gif
    }];

    const note : Note = {
        ...JSON.parse(req.body),
        img: json.img,
        score: Math.trunc(Math.random() * 4),
        manims: manims
    }

    try {
        await db.collection('notes')
            .insertOne(note);
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}
