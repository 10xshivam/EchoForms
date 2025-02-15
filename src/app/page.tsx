"use client";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Spotlight } from "@/components/ui/spotlight-new";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HowItworks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import { Faq } from "@/components/Home/Faq";
import Testimonial from "@/components/Home/Testimonial";

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
      {/* <Pricing /> */}
      <div className="w-full flex items-start px-40 pb-36 flex-col gap-10">
        <div className="p-8 border w-fit">
          <h3 className="text-7xl font-bold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1">
            What Users Say
          </h3>
        </div>
        <div className="flex h-[350px] gap-4 pt-7">
          <div className="bg-zinc-700 rounded-lg h-full w-2"></div>
          <Testimonial />
        </div>
        <span className=" border px-8 p-5 mx-auto">and much more...</span>
      </div>
        <Pricing />
      <div className="w-full flex justify-center items-center px-52 pb-36 ">
        <div className="border max-w-[800px] p-10 flex-col gap-8 flex">
          <h3 className="text-6xl font-semibold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            Things,{" "}
            <span className="text-4xl bg-zinc-700/50 px-5 py-2  rounded-full text-white/80">
              ?
            </span>{" "}
            you
            <span className="block p-1">probably wonder.</span>
          </h3>
          <Faq />
        </div>
      </div>
      <Footer />
    </div>
  );
}
