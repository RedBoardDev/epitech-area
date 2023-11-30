import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'area',
    password: 'postgres',
    port: 5432,
});

client.connect();

export async function query(text, params) {
    return await client.query(text, params);
}
