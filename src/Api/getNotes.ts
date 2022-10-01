import clientPromise from '../../lib/mongodb';

export async function getNotes() {
    const client = await clientPromise;
    const db = client.db('prod');
    const notes = await db.collection('notes').find({}).toArray();

    return {
      notes
    }
}
