'use server';
import * as auth from '@/auth';

export const signInWithGoogle = async () => {
    await auth.signIn('google');
};

export const signInWithGithub = async () => {
    await auth.signIn('github');
};
