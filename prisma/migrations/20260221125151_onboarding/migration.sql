-- CreateTable
CREATE TABLE "onboarding" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "industry" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "has_used_previous_tool" BOOLEAN NOT NULL,

    CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "onboarding_industry_idx" ON "onboarding"("industry");

-- CreateIndex
CREATE INDEX "onboarding_role_idx" ON "onboarding"("role");

-- CreateIndex
CREATE INDEX "onboarding_industry_role_idx" ON "onboarding"("industry", "role");

-- AddForeignKey
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
