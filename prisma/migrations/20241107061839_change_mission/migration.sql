/*
  Warnings:

  - Added the required column `price` to the `mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mission` ADD COLUMN `price` INTEGER NOT NULL;
