/*
  Warnings:

  - You are about to drop the column `authorId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `assignedToId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketType` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Ticket"
    DROP CONSTRAINT "Ticket_authorId_fkey";

-- AlterTable
ALTER TABLE "Ticket"
    DROP COLUMN "authorId",
    ADD COLUMN "assignedToId" TEXT NOT NULL,
    ADD COLUMN "createdBy"    TEXT NOT NULL,
    ADD COLUMN "status"       TEXT NOT NULL,
    ADD COLUMN "ticketType"   TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
