import {User} from '@prisma/client';
import {db} from '@/db';

export type UserData = User;

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