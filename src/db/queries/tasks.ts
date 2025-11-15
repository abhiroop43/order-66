import {Ticket} from "@prisma/client";
import {db} from "@/db";

export type TicketData = Ticket;

export function getTicketsForUser(userId: string): Promise<TicketData[]> {
    return db.ticket.findMany({
        where: {createdBy: userId},
        orderBy: {updatedAt: "desc"}
    });
}