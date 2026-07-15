-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "scheduledVisit" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "notes" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
