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
import { FinalCTA } from "@/components/Home/FinalCTA";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-72 max-md:pt-56">
      <Navbar />
      <Spotlight />
       <InteractiveGridPattern className="top-5 -z-10" />
      <Hero />
      <div className="w-full flex flex-col justify-center items-center gap-12 pb-32 px-40 max-md:p-0 ">
        <Features />
      </div>
      <div className="w-full flex justify-center items-center px-40 pb-36 max-md:p-0">
        <HowItworks />
      </div>
      <div className="w-full flex items-start px-40 pb-36 flex-col gap-10 max-md:hidden">
        <div className="p-8 border w-fit">
          <h3 className="text-7xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1">
            What Users Say
          </h3>
        </div>
        <div className="flex h-[350px] gap-4 pt-7">
          <div className="bg-zinc-700/30 dark:bg-zinc-700 rounded-lg h-full w-2"></div>
          <Testimonial />
        </div>
        <span className=" border px-8 p-5 mx-auto">and much more...</span>
      </div>
        <Pricing />
      <div className="w-full flex justify-center items-center px-52 pb-36 max-md:p-7 max-md:mt-5">
        <div className="border max-w-[800px] p-10 flex-col gap-8 flex max-md:w-full max-md:p-6 max-md:gap-3">
          <h3 className="text-6xl font-semibold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent max-md:text-3xl">
            Things,{" "}
            <span className="text-4xl bg-zinc-700/50 px-5 py-2  rounded-full dark:text-white/80 text-white max-md:text-xl max-md:px-4">
              ?
            </span>{" "}
            you
            <span className="block p-1">probably wonder.</span>
          </h3>
          <Faq />
        </div>
      </div>
      {/* <FinalCTA/>  */}
      {/* <Footer /> */}
    </div>
  );
}
