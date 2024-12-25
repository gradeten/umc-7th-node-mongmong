/*
  Warnings:

  - You are about to drop the column `point` on the `user_mission` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `user_mission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_mission` DROP COLUMN `point`,
    DROP COLUMN `price`;
