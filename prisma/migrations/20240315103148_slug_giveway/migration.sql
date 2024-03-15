/*
  Warnings:

  - Added the required column `slug` to the `Giveway` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Giveway" ADD COLUMN     "slug" TEXT NOT NULL;
