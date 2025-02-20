import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import GithubBtn from "../ui/github-btn";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 pb-80 max-md:gap-2 max-md:pb-36">
      <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block max-md:mb-2">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 max-md:py-[0.01px] max-md:px-3 ">
          <Sparkles className="w-4 max-md:hidden" />
          <span className="max-md:text-[10px]">AI-Powered Form Generation</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
      <h1 className="text-center text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1.5 max-md:text-[25px]  ">
        Generate Forms Instantly.
        <span className="block mt-2">No Code. Just Magic.</span>
      </h1>
      <p className="text-black/60 dark:text-white/60 max-w-2xl text-center text-lg tracking-tight max-md:text-xs max-md:hidden">
        No more dragging fields, no more templates-just describe the form you
        need, and EchoForms will create it in seconds.
      </p>
      <div className="flex gap-4 max-md:mt-1.5">
        <Link href={"/dashboard"}>
          <button className="group bg-zinc-800 hover:bg-zinc-900 text-white h-11 rounded-lg text-md px-5 font-medium max-md:h-9 max-md:px-3 max-md:text-sm">
            Try it now !
            <ArrowUpRight
              className="-me-1 ms-2 opacity-60 inline group-hover:translate-x-1 transition-transform max-md:hidden"
              size={22}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </Link>
        <HoverBorderGradient
          containerClassName="rounded-lg"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 max-md:h-8 max-md:px-3 max-md:text-sm"
          onClick={() => {
            const element = document.getElementById("how-it-works");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span>How it works ?</span>
        </HoverBorderGradient>
      </div>
      <div className="mt-52">

      <GithubBtn/>
      </div>
    </div>
  );
}
