"use client";
import { PinContainer } from "@/components/ui/3d-pin";
// import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Label } from "@/components/ui/label";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  Bot,
  Cable,
  ChartColumn,
  ChartSpline,
  Check,
  ChevronRight,
  FileDown,
  QrCode,
  Share2,
  Sparkles,
  SquarePen,
  Zap,
} from "lucide-react";
import { pricingPlans } from "@/lib/data";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const howItWorks = [
  {
    step: 1,
    title: "Describe Your Form",
    description:
      "Simply type what kind of form you need—whether it's a survey, registration form, or feedback form. EchoForms understands your needs instantly.",
    icon: <SquarePen />,
  },
  {
    step: 2,
    title: "AI Generates It",
    description:
      "Our powerful AI builds a fully functional form in seconds, structured exactly as you described—no coding, no drag-and-drop required.",
    icon: <Zap />,
  },
  {
    step: 3,
    title: "Share & Embed",
    description:
      "Get a shareable link or embed it anywhere—your website, Notion, or any platform. Start collecting responses instantly.",
    icon: <Share2 />,
  },
  {
    step: 4,
    title: "Analyze Responses",
    description:
      "View and manage responses in real time with our intuitive dashboard. Export data or integrate with Notion, Zapier, and Google Sheets.",
    icon: <ChartColumn />,
  },
];

const features = [
  {
    title: "AI-Powered Form Generation",
    description:
      "Create any form instantly with a single prompt. No manual setup—just describe your needs, and EchoForms builds it for you.",
    icon: <Bot size={35} />,
  },
  {
    title: "Customize Your Forms",
    description:
      "Customize fields, apply validations, and design visually appealing forms with a seamless user experience.",
    icon: <Sparkles size={30} />,
  },
  {
    title: "Instant Sharing & Embedding",
    description:
      "Get a unique shareable link or QR code upon creation. Easily embed forms on your website with a simple copy-paste.",
    icon: <QrCode size={35} />,
  },
  {
    title: "Real-Time Response Tracking",
    description:
      "Monitor submissions as they happen with detailed analytics. Receive instant email notifications for every new response.",
    icon: <ChartSpline size={35} />,
  },
  {
    title: "Seamless Data Export",
    description:
      "Download all responses in CSV format for easy reporting and analysis. Manage submissions efficiently in one place.",
    icon: <FileDown size={35} />,
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect with Notion, Zapier, Google Sheets, and other tools for automated workflows.",
    icon: <Cable size={35} />,
  },
];

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-72">
      <Navbar />
      <Spotlight />
      <InteractiveGridPattern className="top-5 -z-10" />
      <div className="flex flex-col justify-center items-center gap-5 pb-80">
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
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
      <div className="w-full flex flex-col justify-center items-center gap-10 pb-32 px-40">
        <h2 className="text-7xl font-semibold tracking-tighter bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent pb-1.5">
          Why EchoForms ?
        </h2>
        <div className="bg-zinc-900/60 w-full rounded-2xl p-10">
          <div className="grid grid-cols-2 w-full pb-5">
            <div>
              <h3 className="text-5xl font-semibold tracking-tight bg-gradient-to-r dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                Features That Matter
              </h3>
              <p className="mt-4 text-zinc-500 max-w-6xl text-lg">
                Build dynamic, high-performing forms effortlessly. From
                collecting customer feedback to managing registrations,
                EchoForms simplifies every step. Automate workflows, enhance
                data accuracy, and ensure a seamless user experience—all while
                integrating with the tools you rely on. Designed for speed,
                flexibility, and efficiency, so you can focus on what truly
                matters.
              </p>
              <button className="mt-[1.6rem] bg-zinc-800 text-white h-12 text-lg  hover:bg-zinc-900 rounded-lg px-7">
                Preview Your Form
                <ChevronRight className="ml-3 inline" size={20} />
              </button>
            </div>
            <div className="h-[400px] pt-10 ">
              <PinContainer title="/echoforms.com">
                <div className="flex basis-full flex-col p-2 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] items-center ">
                  <h3 className="font-bold text-xl text-white/90">
                    Feedback Form
                  </h3>
                  <h4 className="text-white/40 text-base my-1 ">
                    We value your feedback
                  </h4>
                  <div className="w-full max-w-md">
                    <Label className="text-white/60">Name</Label>
                    <Input
                      type="text"
                      className="border-white/20 bg-zinc-950 mb-3"
                      placeholder="Enter your name"
                      disabled
                    />
                    <Label className="text-white/60">Email</Label>
                    <Input
                      type="email"
                      className="border-white/20 bg-zinc-950 mb-3"
                      placeholder="Enter your email"
                      disabled
                    />
                    <Label className="text-white/60">Feedback</Label>
                    <Textarea
                      className="border-white/20 bg-zinc-950 mb-4"
                      placeholder="Write your feedback here"
                      disabled
                    />
                    <Button
                      type="submit"
                      className="w-full bg-zinc-700 text-white hover:bg-zinc-800"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </PinContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 pt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative flex overflow-hidden rounded-2xl bg-zinc-900/10 dark:bg-zinc-900 p-6 transition-all hover:bg-zinc-900/20 dark:hover:bg-zinc-800/80 max-md:p-5 gap-3"
              >
                <div className="flex px-5  items-center justify-center rounded-xl bg-zinc-500/10">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-tight text-zinc-500 dark:text-zinc-400 ">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 pb-32">
        <h2 className="text-6xl font-semibold tracking-tighter bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
          How it works ?
        </h2>
        <div className="w-full flex flex-col items-center justify-center  gap-7 max-md:pt-10 max-md:px-7 max-md:gap-6">
          {howItWorks.map((step) => (
            <div
              key={step.step}
              className="group relative overflow-hidden rounded-2xl bg-zinc-800/20 dark:bg-zinc-900 p-6 transition-all hover:bg-zinc-900/20 dark:hover:bg-zinc-800/80 max-md:p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex gap-6 max-md:flex-col max-md:gap-2">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-500/10">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Step {step.step}
                  </div>
                  <h3 className="mt-2 text-xl font-medium text-black dark:text-white max-md:text-[1.3rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-500 dark:text-zinc-400  max-w-3xl max-md:leading-5 max-md:text-[0.9rem]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 pb-32">
        <h2 className="text-6xl font-semibold tracking-tighter bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
          Plans & Prices.
        </h2>
        <div className="flex justify-center items-center gap-10">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="bg-zinc-900/10 dark:bg-zinc-900 p-5 px-7 flex flex-col rounded-xl space-y-2"
            >
              <p className="text-lg tracking-tight font-medium mb-3 text-zinc-700 dark:text-zinc-200/50">
                {plan.name}
              </p>
              <p className="text-3xl font-bold !mb-2">{plan.price}</p>
              <div className="w-full h-0.5 bg-white/10" />
              <p className="text-md tracking-tight font-medium mb-2 text-black/70 dark:text-white/70">
                Features
              </p>
              <div className="flex flex-col">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-1 mb-1">
                    <Check
                      className="bg-black/5 dark:bg-white/10 rounded-full p-1 inline"
                      size={15}
                    />
                    <span className="text-zinc-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-zinc-700 dark:bg-zinc-400/10 hover:bg-zinc-800 dark:hover:bg-zinc-400/30 text-white !mb-1">
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
