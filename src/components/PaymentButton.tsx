"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";



interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: Record<string, unknown>) => void;
  notes: Record<string, string>;
  theme: {
    color?: string;
    backdrop_color?: string;
  };
}

export default function PaymentPage() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { user } = useUser();
  
  useEffect(() => {
    const loadRazorpay = async () => {
      if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
      }
    };
    loadRazorpay();
  }, []);
  
  if (!user) {
    return null;
  }

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      console.error("Razorpay SDK not loaded");
      return;
    }

    const userId = user.id; 
    const response = await fetch("/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: 499 }), 
    });

    const data = await response.json();
    if (!data.success) {
      console.error("Order creation failed");
      return;
    }

    const options:RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: data.order.amount,
      currency: "INR",
      name: "EchoForms",
      description: "Test Transaction",
      order_id: data.order.id, 
      handler: async function (response: Record<string, unknown>) {
        console.log("Payment Success:", response);
      },
      notes: { userId },
      theme: { color: "#18181B"},
    };

    const Razorpay = (window as { Razorpay?: new (options: RazorpayOptions) => unknown }).Razorpay;

    if (!Razorpay) {
      console.error("Razorpay SDK not loaded");
      return;
    }

    const razorpay = new Razorpay(options);
    (razorpay as { open: () => void }).open();
  
   
    
};

  return (
    <div>
      <h2>Pay with Razorpay</h2>
      <button onClick={handlePayment} disabled={!razorpayLoaded}>
        Pay Now
      </button>
    </div>
  );
}


