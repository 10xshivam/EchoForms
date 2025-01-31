"use client";
import { PinContainer } from "@/components/ui/3d-pin";
import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Label } from "@/components/ui/label";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-72">
      <Spotlight />
      <InteractiveGridPattern className="top-5 -z-10" />
      <div className="flex flex-col justify-center items-center gap-5">
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <Sparkles className="w-4" />
            <span>AI-Powered Form Generation</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        <h1 className="text-center text-7xl font-bold tracking-tighter  ">
          Generate Forms Instantly.
          <span className="block mt-2">No Code. Just Magic.</span>
        </h1>
        <p className="text-black/60 dark:text-white/60 max-w-2xl text-center text-lg tracking-tight">
          No more dragging fields, no more templates-just describe the form you
          need, and EchoForms will create it in seconds.
        </p>
        <div className="flex gap-4 ">
          <button className="group bg-zinc-800 hover:bg-zinc-900 text-white h-11 rounded-lg text-md px-5 font-medium">
            Try it now
            <ArrowUpRight
              className="-me-1 ms-2 opacity-60 inline group-hover:translate-x-1 transition-transform"
              size={22}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>

          <HoverBorderGradient
            containerClassName="rounded-lg"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>How it works ?</span>
          </HoverBorderGradient>
        </div>
      </div>
      <div className="w-full pt-52 pb-32 flex justify-center items-center px-52">
        <div className="size-full max-w-xl items-center justify-center  pt-8">
          <BoxReveal  duration={0.5}>
            <h2 className="text-[3.5rem] font-semibold tracking-tighter text-white/80 mb-5">
              Why EchoForms <span className="text-zinc-600">?</span>
            </h2>
          </BoxReveal>
          <BoxReveal duration={0.5}>
            <h2 className="mt-[.5rem] text-2xl">
              The Future of{" "}
              <span className="text-zinc-500 font-medium">
                AI-Powered Form Building
              </span>
            </h2>
          </BoxReveal>
          <BoxReveal duration={0.5}>
            <div className="mt-6">
              <p className="text-lg">
                -&gt; Generate forms instantly using
                <span className="font-semibold text-zinc-500"> AI prompts</span>
                . <br />
                -&gt; No coding, no drag-and-drop—just describe and create.{" "}
                <br />
                -&gt; 100% customizable and embeddable in any platform. <br />
              </p>
            </div>
          </BoxReveal>
          <BoxReveal duration={0.5}>
            <Button className="mt-[1.6rem] bg-zinc-800 text-white h-11 hover:bg-zinc-900">
              Try EchoForms
            </Button>
          </BoxReveal>
        </div>
        <div className="h-[40rem] w-full flex items-center justify-center p-5">
          <PinContainer title="/ui.aceternity.com">
            <div className="flex basis-full flex-col p-2 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] items-center ">
              <h3 className="font-bold text-xl text-white/90">
                Feedback Form
              </h3>
              <h4 className="text-white/20 text-lg my-1 ">We value your feedback</h4>
              <form className="w-full max-w-md">
                <Label className="text-white/60">Your Name</Label>
                <Input
                  type="text"
                  className="border-white/20 bg-zinc-950 mb-3"
                  placeholder="Enter your name"
                  disabled
                />

                <Label className="text-white/60">Your Email</Label>
                <Input
                  type="email"
                  className="border-white/20 bg-zinc-950 mb-3"
                  placeholder="Enter your email"
                  disabled
                />

                <Label className="text-white/60">
                  Your Feedback
                </Label>
                <Textarea
                  className="border-white/20 bg-zinc-950 mb-4"
                  placeholder="Write your feedback here"
                  disabled
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </Button>
              </form>
            </div>
          </PinContainer>
        </div>
      </div>
    </div>
  );
}
