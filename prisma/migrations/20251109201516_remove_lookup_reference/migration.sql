/*
  Warnings:

  - You are about to drop the column `statusId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketTypeId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_statusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_ticketTypeId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "statusId",
DROP
COLUMN "ticketTypeId",
ADD COLUMN     "status" TEXT,
ADD COLUMN     "ticketType" TEXT;
