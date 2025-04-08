CREATE TABLE "payment_subject" (
	"payment_id" uuid,
	"subject_id" uuid
);
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_subject_id_payment_month_unique";--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_subject_id_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment_subject" ADD CONSTRAINT "payment_subject_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_subject" ADD CONSTRAINT "payment_subject_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "subject_id";