/*
  Warnings:

  - Added the required column `correct` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incorrect` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Result` ADD COLUMN `correct` INTEGER NOT NULL,
    ADD COLUMN `incorrect` INTEGER NOT NULL;
