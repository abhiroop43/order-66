-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Ticket"
    ALTER COLUMN "assignedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
