//** mongodb
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017', {});

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});

export async function findDocuments(collectionName, filter) {
    const database = client.db('area');
    const collection = database.collection(collectionName);
    return await collection.find(filter).toArray();
}

export async function insertDocument(collectionName, document) {
    const database = client.db('area');
    const collection = database.collection(collectionName);
    return await collection.insertOne(document);
}

//** postgres
// import { Client } from 'pg';

// const client = new Client({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'area',
//     password: 'postgres',
//     port: 5432,
// });

// client.connect();

// export async function query(text, params) {
//     return await client.query(text, params);
// }
