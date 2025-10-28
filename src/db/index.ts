import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from 'prisma/config';
import 'dotenv/config';

const connectionString = env('DATABASE_URL');

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient({ adapter }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;
