import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");
  

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers:", { svix_id, svix_timestamp, svix_signature });
    return new Response("Missing Svix headers", { status: 400 });
  }

  const rawBody = await req.text();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let msg: WebhookEvent;

  try {
    msg = wh.verify(rawBody, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log("Verified Event:", JSON.stringify(msg, null, 2));
  } catch (err) {
    console.error("Invalid Signature", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (msg.type === "user.created") {
    try {
      const { id, email_addresses, first_name, image_url } = msg.data;

      const email = email_addresses?.length > 0 ? email_addresses[0].email_address : null;
      if (!email) {
        console.error("No email found in webhook data");
        return new Response("Missing email", { status: 400 });
      }

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        console.log("User already exists:", existingUser[0]);
        return new Response("User already exists", { status: 409 });
      }

      await db.insert(users).values({
        id,
        name: first_name || "Unknown",
        email,
        image: image_url || "https://default-avatar.com/avatar.png",
        plan:"Basic"
      });

      console.log("User created successfully in database:", { id, email });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user in database", { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
