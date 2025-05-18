/*
  Warnings:

  - The values [PRIORITIZE,DEPRIORITIZE,REJECT] on the enum `InternalDecision` will be removed. If these variants are still used in the database, this will fail.

*/
-- Create new enum type
CREATE TYPE "InternalDecision_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- Update existing records to use a default value
ALTER TABLE "Mandate" 
  ALTER COLUMN "internalDecision" TYPE "InternalDecision_new" 
  USING CASE 
    WHEN "internalDecision" = 'PRIORITIZE' THEN 'APPROVED'::"InternalDecision_new"
    WHEN "internalDecision" = 'DEPRIORITIZE' THEN 'REJECTED'::"InternalDecision_new"
    WHEN "internalDecision" = 'REJECT' THEN 'REJECTED'::"InternalDecision_new"
    ELSE 'PENDING'::"InternalDecision_new"
  END;

-- Drop old enum type
DROP TYPE "InternalDecision";

-- Rename new enum type to original name
ALTER TYPE "InternalDecision_new" RENAME TO "InternalDecision";
