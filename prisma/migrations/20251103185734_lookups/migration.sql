/*
  Warnings:

  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket"
    DROP COLUMN "status",
    DROP COLUMN "ticketType",
    ADD COLUMN "statusId"     TEXT,
    ADD COLUMN "ticketTypeId" TEXT;

-- CreateTable
CREATE TABLE "Lookup"
(
    "id"        TEXT         NOT NULL,
    "key"       TEXT         NOT NULL,
    "value"     TEXT         NOT NULL,
    "createdBy" TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata"  JSONB,

    CONSTRAINT "Lookup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "Lookup" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Lookup" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
