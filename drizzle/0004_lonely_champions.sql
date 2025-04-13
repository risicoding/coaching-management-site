ALTER TABLE "payment_subject" DROP CONSTRAINT "payment_subject_payment_id_payments_id_fk";
--> statement-breakpoint
ALTER TABLE "payment_subject" ADD CONSTRAINT "payment_subject_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;