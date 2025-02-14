"use client";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Spotlight } from "@/components/ui/spotlight-new";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HowItworks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import { Testimonial } from "@/components/Home/Testimonial";
import { Faq } from "@/components/Home/Faq";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-72">
      <Navbar />
      <Spotlight />
      <InteractiveGridPattern className="top-5 -z-10" />
      <Hero />
      <div className="w-full flex flex-col justify-center items-center gap-12 pb-32 px-40">
        <Features />
      </div>
      <div className="w-full flex justify-center items-center px-40 pb-36">
        <HowItworks />
      </div>
      <Pricing />
      <div className="w-full flex justify-center items-center px-40 pb-36 flex-col gap-10">
        <h3 className="text-6xl font-semibold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          Hear It from Our Users...
        </h3>
        <Testimonial />
      </div>
      <div className="w-full flex justify-center items-center px-52 pb-36 flex-col gap-10">
        <h3 className="text-6xl font-semibold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
        FAQs – Your Questions, Answered
        </h3>
        <Faq/>
      </div>
      <Footer />
    </div>
  );
}
