import dotenv from 'dotenv';
import * as schema from './schema'
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

dotenv.config();

const DATABASE_URL: string = process.env.DATABASE_URL!
if (!DATABASE_URL) {
    throw new Error("Database url not found")
}

const sqlite = new Database(DATABASE_URL);
export const db = drizzle(
    sqlite,
    { schema: schema }
);
