/*
  Warnings:

  - Added the required column `userId` to the `sources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sources" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sources" ADD CONSTRAINT "sources_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
