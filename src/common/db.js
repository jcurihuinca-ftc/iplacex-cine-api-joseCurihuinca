import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://u3-user:ph78BQcD28gWkW5s@eva-u3-express.zvisxcq.mongodb.net/?appName=eva-u3-express';
const client = new MongoClient(uri);
const dbName = 'cine-db';

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    throw err;
  }
}

export function getDb() {
  return client.db(dbName);
}
