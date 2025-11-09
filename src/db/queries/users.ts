import {User} from '@prisma/client';
import {db} from '@/db';

export type UserData = User;

/**
 * Get all users
 * @param searchString the search string to filter the users
 * @returns a promise with an array of users
 */
export const getUsers = (searchString: string = ''): Promise<UserData[]> => {
    return db.user.findMany({
        where: {
            OR: [{name: {contains: searchString, mode: 'insensitive',}}, {
                email: {
                    contains: searchString,
                    mode: 'insensitive',
                }
            }]
        }
    });
}