import NextAuth from 'next-auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from '@/db';
import Google from "next-auth/providers/google";
import GitHub from "@auth/core/providers/github";

const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!AUTH_GOOGLE_ID || !AUTH_GOOGLE_SECRET) {
    throw new Error('Missing Google OAuth environment variables');
}

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing GitHub OAuth environment variables');
}


export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: AUTH_GOOGLE_ID,
            clientSecret: AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // to fix a bug in next-auth
        async session({session, user}) {
            if (session && user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
});
