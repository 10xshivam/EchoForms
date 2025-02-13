import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${userId}`,
      payment_capture: true,
      notes: { userId },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ success: false, message: "Order creation failed" }, { status: 500 });
  }
}

