"use client";

import React, { useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ChartColumn, QrCode, SquarePen, Zap } from "lucide-react";

export default function HowItWorks({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  const howItWorks = [
    {
      step: 1,
      title: "Describe Your Form",
      description:
        "Simply type what kind of form you need—whether it's a survey, registration form, or feedback form. EchoForms instantly understands your needs.",
      icon: <SquarePen />,
      ref: div2Ref,
    },
    {
      step: 2,
      title: "AI Generates It",
      description:
        "Our powerful AI builds a fully functional form in seconds, structured exactly as you described—no coding or drag-and-drop required.",
      icon: <Zap />,
      ref: div3Ref,
    },
    {
      step: 3,
      title: "Get a Shareable QR Code",
      description:
        "Every form gets a unique link and a QR code, making it easier to share and collect responses anywhere.",
      icon: <QrCode />,
      ref: div4Ref,
    },
    {
      step: 4,
      title: "Analyze Responses",
      description:
        "Track submissions in real time with our clean dashboard. Export data as CSV for reporting and analysis.",
      icon: <ChartColumn />,
      ref: div5Ref,
    },
  ];
  
  return (
    <div
      className={cn(
        "relative flex w-full justify-center items-center gap-36 max-md:flex-col max-md:pt-5 max-md:gap-6 max-md:p-7",
        className
      )}
      ref={containerRef}
      id="how-it-works"
    >
      <div
        ref={div6Ref}
        className="bg-zinc-300 dark:bg-zinc-700 z-40 rounded-xl p-5 max-md:p-3 max-md:border max-md:dark:bg-transparent max-md:bg-transparent max-md:rounded-none max-md:w-full"
      >
        <h2 className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-white/70 bg-clip-text text-transparent max-md:text-3xl max-md:text-center">
          How it works ?
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 z-40 max-md:gap-4 max-md:px-2">
        {howItWorks.map((step) => (
          <div
            ref={step.ref}
            key={step.step}
            className="group relative overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-900 p-6  max-md:p-5"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex gap-6 max-md:flex-col">
              <div className="max-md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-500/10 ">
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Step {step.step}
                </div>
                <h3 className="mt-1 text-lg font-medium text-black dark:text-white max-md:text-[1.1rem] max-md:mt-0">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-tight text-zinc-500 dark:text-zinc-400  max-w-xl max-md:leading-5 max-md:text-xs max-md:mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        curvature={100}
        duration={5}
        gradientStartColor={"#ffffff"}
        gradientStopColor={"#b5b5b5"}
        className="max-md:hidden"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        curvature={50}
        duration={5}
        gradientStartColor={"#ffffff"}
        gradientStopColor={"#b5b5b5"}
        className="max-md:hidden"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        curvature={-50}
        duration={5}
        gradientStartColor={"#ffffff"}
        gradientStopColor={"#b5b5b5"}
        className="max-md:hidden"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        curvature={-100}
        duration={5}
        gradientStartColor={"#ffffff"}
        gradientStopColor={"#b5b5b5"}
        className="max-md:hidden"
      />
    </div>
  );
}
