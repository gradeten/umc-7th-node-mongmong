/*
  Warnings:

  - You are about to drop the column `content` on the `user_store_review` table. All the data in the column will be lost.
  - Added the required column `comment` to the `user_store_review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `user_store_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_store_review` DROP COLUMN `content`,
    ADD COLUMN `comment` TEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `rating` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `status` ENUM('SUCCESS', 'FAILURE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
