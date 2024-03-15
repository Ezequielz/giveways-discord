/*
  Warnings:

  - The `status` column on the `Giveway` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('activo', 'pendiente', 'finalizado');

-- DropForeignKey
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_giveawayId_fkey";

-- AlterTable
ALTER TABLE "Giveway" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pendiente';

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveway"("id") ON DELETE CASCADE ON UPDATE CASCADE;
