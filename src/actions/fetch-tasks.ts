"use server";

import { getTicketDetails, getTicketsForUser } from "@/db/queries/tasks";

export const fetTasksForUser = async (userId: string) =>
  await getTicketsForUser(userId);

export const fetchTaskDetails = async (taskId: string) =>
  await getTicketDetails(taskId);
