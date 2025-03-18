ALTER TABLE "user-course" DROP CONSTRAINT "user-course_user-id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user-course" DROP CONSTRAINT "user-course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "user-course" DROP CONSTRAINT "user-course_user-clerk-id_users_clerk-user-id_fk";
--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "offerings" json;--> statement-breakpoint
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_id_courses_id_fk" FOREIGN KEY ("id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_user-clerk-id_users_clerk-user-id_fk" FOREIGN KEY ("user-clerk-id") REFERENCES "public"."users"("clerk-user-id") ON DELETE cascade ON UPDATE no action;