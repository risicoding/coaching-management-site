import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db/db";
import { users } from "@/server/db/schemas";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  switch (evt.type) {
    case "user.created":
      const fullName = evt.data.first_name + " " + evt.data.last_name;

      await db.insert(users).values({
        name: fullName,
        email:
          evt.data.email_addresses.find(
            (email) => email.id === evt.data.primary_email_address_id,
          )?.email_address ?? " ",
        clerkUserId: evt.data.id,
        role: evt.data.public_metadata.role as "admin" | "student",
      });
      break;
    case "user.updated":
      await db
        .update(users)
        .set({
          name: evt.data.first_name + " " + evt.data.last_name,
          email:
            evt.data.email_addresses.find(
              (email) => email.id === evt.data.primary_email_address_id,
            )?.email_address ?? " ",
          clerkUserId: evt.data.id,
          role: evt.data.public_metadata.role as "admin" | "student",
        })
        .where(eq(users.clerkUserId, evt.data.id));
      console.log(evt.data);
      break;
    case "user.deleted":
      await db.delete(users).where(eq(users.clerkUserId, evt.data.id!));
  }

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  return new Response("Webhook received", { status: 200 });
}
