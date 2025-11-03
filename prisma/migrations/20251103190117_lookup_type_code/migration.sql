/*
  Warnings:

  - Added the required column `typeCode` to the `Lookup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lookup"
    ADD COLUMN "typeCode" TEXT NOT NULL;
