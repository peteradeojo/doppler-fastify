/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `onboarding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "onboarding_userId_key" ON "onboarding"("userId");
