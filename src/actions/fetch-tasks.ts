"use server";

import {getTicketsForUser} from "@/db/queries/tasks";

export const fetTasksForUser = async (userId: string) => await getTicketsForUser(userId);