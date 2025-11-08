"use server";

import {getUsers} from "@/db/queries/users";

export const fetchUsers = async (filterText?: string) => {
    return await getUsers(filterText);
}