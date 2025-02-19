"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Home/Pricing";

export default function PricingPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center pt-28">
      <Navbar />
      <Pricing/>
      <Footer />
    </div>
  );
}
