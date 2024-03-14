/*
  Warnings:

  - The `status` column on the `Giveaway` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `effectiveDate` on the `Giveaway` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Giveaway" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "effectiveDate",
ADD COLUMN     "effectiveDate" TIMESTAMP(3) NOT NULL;
