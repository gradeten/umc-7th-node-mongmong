/*
  Warnings:

  - You are about to drop the column `status` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `mission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_user_id_fkey`;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `status`,
    DROP COLUMN `user_id`;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `status` ENUM('SUCCESS', 'FAILURE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
