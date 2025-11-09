import {Lookup} from "@prisma/client";
import {db} from '@/db';

export type LookupData = Lookup;

/**
 * Get all lookups by type
 * @param lookupType the lookup type code
 * @param searchString the search string to filter the lookups
 * @returns a promise with an array of lookups
 */
export const getLookupsByType = (lookupType: string, searchString: string = ''): Promise<LookupData[]> => {
    return db.lookup.findMany({
        where: {
            typeCode: lookupType,
            OR: [{key: {contains: searchString, mode: 'insensitive',}}, {
                value: {
                    contains: searchString,
                    mode: 'insensitive',
                }
            }]
        }
    })
}