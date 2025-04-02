ALTER TABLE "attendance" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "attendance" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "attendance" DROP COLUMN "is_present";