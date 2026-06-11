import { MongoClient, Db } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB ?? 'brynexlabs';

// Cache the client promise on globalThis so Next.js dev HMR and serverless
// warm starts reuse one connection pool instead of leaking new ones.
const globalForMongo = globalThis as unknown as {
    _mongoClientPromise?: Promise<MongoClient>;
};

export function isDbConfigured(): boolean {
    return Boolean(process.env.MONGODB_URI);
}

export async function getDb(): Promise<Db> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not set. Add it to .env.local to enable the blog CMS.');
    }

    if (!globalForMongo._mongoClientPromise) {
        const client = new MongoClient(uri, { maxPoolSize: 10 });
        globalForMongo._mongoClientPromise = client.connect();
    }

    const client = await globalForMongo._mongoClientPromise;
    return client.db(DB_NAME);
}
