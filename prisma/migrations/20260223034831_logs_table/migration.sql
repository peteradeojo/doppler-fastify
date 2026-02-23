-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('info', 'error', 'critical', 'debug', 'warn');

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "apptoken" TEXT NOT NULL,
    "level" "LogLevel" NOT NULL DEFAULT 'error',
    "context" JSONB,
    "ip" TEXT,
    "tags" JSONB,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_apptoken_fkey" FOREIGN KEY ("apptoken") REFERENCES "sources"("token") ON DELETE RESTRICT ON UPDATE CASCADE;
