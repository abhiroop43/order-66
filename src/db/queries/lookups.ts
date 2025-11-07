import {Lookup} from "@prisma/client";
import {db} from '@/db';

/**
 * Get all lookups by type
 * @param lookupType the lookup type code
 * @param searchString the search string to filter the lookups
 * @returns
 */
export function getLookupsByType(lookupType: string, searchString: string = ''): Promise<Lookup[]> {
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