"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { pricingPlans } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpgradePlan from "@/components/UpgradePlan";
import axios from "axios";

export default function Pricing() {
  const router = useRouter();
  const [usage, setUsage] = useState({
    createdForms: 0,
    totalSubmissions: 0,
    plan: "Basic",
  })
useEffect(() => {
  async function fetchUsage() {
    const res = await axios.get(`/api/getUsage`);
    const data = await res.data;
    setUsage(data);
  }
  fetchUsage();
}, []);
  const subscriptionStatus = usage.plan; 

  const handleButtonClick = (action: string) => {
    if (action === "redirect") {
      router.push("/dashboard"); 
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center pt-28">
      <Navbar />
      <h3 className="text-7xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1.5 mb-5">
        Plans and Pricing
      </h3>
      <div className="flex justify-center items-center gap-10 pt-7 flex-wrap pb-28">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="p-5 border w-fit rounded-lg">
            <div className="bg-zinc-900/10 dark:bg-zinc-900 p-5 px-7 flex flex-col rounded-xl space-y-2 w-[350px]">
              <div>
                <p className="text-2xl tracking-tight font-medium mb-1 text-zinc-700 dark:text-zinc-200">
                  {plan.name.toUpperCase()}
                </p>
                <p className="text-base tracking-tight leading-tight mb-3 text-zinc-700 dark:text-zinc-200/50">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold !mb-2">
                  {plan.price}{" "}
                  <span className="block font-normal text-base text-zinc-700/80 dark:text-zinc-100/30 ">
                    Billed monthly
                  </span>
                </p>
              </div>
              <Separator />
              <p className="text-md tracking-tight font-medium mb-2 text-black/70 dark:text-white/70">
                Features
              </p>
              <div className="flex flex-col">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 mb-1">
                    <Check className="text-blue-800 inline" size={15} />
                    <span className="text-zinc-700/60 dark:text-zinc-400 text-base">{feature}</span>
                  </div>
                ))}
              </div>
              {/* Conditional Rendering of Buttons */}
              {plan.action === "redirect" && (
                <Button
                  onClick={() => handleButtonClick(plan.action)}
                  className="bg-zinc-700 dark:bg-zinc-500/50 hover:bg-zinc-800 dark:hover:bg-zinc-400/30 text-white !mb-1"
                >
                  {plan.buttonText}
                </Button>
              )}
              {plan.action === "upgrade" && subscriptionStatus === "Pro" && (
                <Button variant={"outline"} className="text-green-600 font-medium text-center py-2">
                  You already have the Pro plan!
                </Button>
              )}
              {plan.action === "upgrade" && subscriptionStatus !== "Pro" && (
                <UpgradePlan />
              )}
              {plan.action === "coming-soon" && (
                <Button
                  disabled
                  className="bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed !mb-1"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
