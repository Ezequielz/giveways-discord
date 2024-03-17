/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Giveway` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_giveawayId_fkey";

-- AlterTable
ALTER TABLE "Giveway" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Prize" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Giveway_slug_key" ON "Giveway"("slug");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveway"("id") ON DELETE CASCADE ON UPDATE CASCADE;
