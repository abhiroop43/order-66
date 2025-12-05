import { Ticket } from "@prisma/client";
import { db } from "@/db";

export type TicketData = Ticket & {
  assignedTo: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
};

export function getTicketsForUser(userId: string): Promise<TicketData[]> {
  return db.ticket.findMany({
    where: { createdBy: userId },
    include: { assignedTo: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getTicketDetails(ticketId: string): Promise<TicketData | null> {
  return db.ticket.findUnique({
    where: { id: ticketId },
    include: { assignedTo: true },
  });
}
