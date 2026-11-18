DO $$ BEGIN
    CREATE TYPE "ServiceAudience" AS ENUM ('GENERAL', 'STUDENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "audience" "ServiceAudience" NOT NULL DEFAULT 'GENERAL';
