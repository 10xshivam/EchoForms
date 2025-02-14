"use client";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Spotlight } from "@/components/ui/spotlight-new";
import {
  Check,
} from "lucide-react";
import { pricingPlans } from "@/lib/data";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HowItworks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import { Separator } from "@/components/ui/separator";



export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-72">
      <Navbar />
      <Spotlight />
      <InteractiveGridPattern className="top-5 -z-10" />
      <Hero/>
      <div className="w-full flex flex-col justify-center items-center gap-12 pb-32 px-40">
        <Features/>
      </div>
      <div className="w-full flex justify-center items-center px-40 pb-36">
        <HowItworks />
      </div>
      <div className="flex flex-col justify-center items-center gap-10 pb-32">
        <h2 className="text-7xl font-semibold tracking-tighter bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <div className="flex justify-center items-center gap-10 ">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="bg-zinc-900/10 dark:bg-zinc-900 p-5 px-7 flex flex-col rounded-xl space-y-2 w-[350px] "
            >
              <p className="text-2xl tracking-tight font-medium mb-3 text-zinc-700 dark:text-zinc-200">
                {plan.name}
              </p>
              <p className="text-3xl text-center font-bold !mb-2">{plan.price} <span className="block font-normal text-base text-zinc-100/30">Billed monthly</span></p>
              
              <Separator/>
              <p className="text-md tracking-tight font-medium mb-2 text-black/70 dark:text-white/70">
                Features
              </p>
              <div className="flex flex-col h-[280px]">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-1 mb-1 ">
                    <Check
                      className="text-blue-800 inline"
                      size={15}
                    />
                    <span className="text-zinc-400 text-base">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-zinc-700 dark:bg-zinc-500/50 hover:bg-zinc-800 dark:hover:bg-zinc-400/30 text-white !mb-1">
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
