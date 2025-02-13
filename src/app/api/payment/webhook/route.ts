import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const razorpaySignature = req.headers.get("x-razorpay-signature")!;
    const body = await req.text();
    console.log("Webhook triggered")

    // Verify webhook signature
    const expectedSignature = crypto.createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

      console.log("Received Razorpay Signature:", razorpaySignature);
console.log("Expected Signature:", expectedSignature);


    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ success: false, message: "Invalid webhook signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    if (payload.event === "payment.captured") {
      const userId = payload.payload.payment.entity.notes.userId;
      const amountPaid = payload.payload.payment.entity.amount / 100; // Convert paise to INR

      // Determine plan based on payment amount
      let plan;
      if (amountPaid === 499) plan = "pro";

      console.log(userId)
      const added = await db
        .update(subscriptions)
        .set({ plan, updatedAt: new Date() })
        .where(eq(subscriptions.userId, String(userId)))
        .returning();

        if(added){
          console.log("Subscription updated",added)
        }

      return NextResponse.json({ success: true, message: "Subscription activated!" });
    }

    return NextResponse.json({ success: false, message: "Unhandled event type" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
