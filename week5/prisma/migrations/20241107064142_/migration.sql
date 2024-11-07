/*
  Warnings:

  - The values [SUCCESS,FAILURE] on the enum `user_mission_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user_mission` MODIFY `status` ENUM('ONGOING', 'DONE') NOT NULL;
