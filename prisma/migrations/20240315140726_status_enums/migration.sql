/*
  Warnings:

  - The `status` column on the `Giveway` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusGiveway" AS ENUM ('activo', 'pendiente', 'finalizado');

-- AlterTable
ALTER TABLE "Giveway" DROP COLUMN "status",
ADD COLUMN     "status" "StatusGiveway" NOT NULL DEFAULT 'pendiente';

-- DropEnum
DROP TYPE "Status";
