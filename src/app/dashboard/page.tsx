"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ChartColumn,
  CircleFadingArrowUp,
  House,
  LibraryBig,
  TextQuote,
} from "lucide-react";
import { format } from "date-fns";
import User from "@/components/User";
import Link from "next/link";
import { useState } from "react";
import { CreateForm } from "@/components/CreateForm";
import PlanUsage from "@/components/PlanUsage";

const options = [
  {
    icon: <LibraryBig />,
    name: "My Forms",
    url: "/my-forms",
  },
  {
    icon: <TextQuote />,
    name: "Responses",
    url: "/responses",
  },
  {
    icon: <ChartColumn />,
    name: "Analyze",
    url: "/analyze",
  },
  {
    icon: <CircleFadingArrowUp />,
    name: "Upgrade",
    url: "/upgrade",
  },
];

export default function Dashboard() {
  const currentDate = format(new Date(), "MMMM dd, yyyy");
  const [activeUrl, setActiveUrl] = useState("");

  const handleOptionClick = (url:string) => {
    setActiveUrl(url);
  };

  return (
    <div className="w-full min-h-screen flex p-4 gap-4">
      <div className="w-60 min-h-full bg-zinc-900 rounded-xl p-4 flex-col gap-3 inline-flex">
        <div className="flex gap-3 items-center">
          <div className="border-2 rounded-lg p-1">
            <Image src="/Logo.png" alt="EchoForms" width={26} height={26} />
          </div>
          <span className="text-2xl font-bold text-black/70 dark:text-white/70 tracking-tighter">
            EchoForms
          </span>
        </div>
        <Separator />
        <CreateForm/>
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <div
              key={option.name}
              className="flex gap-3 items-center hover:bg-zinc-500/20 p-2 cursor-pointer rounded-lg"
              onClick={() => handleOptionClick(option.url)}
            >
              {option.icon}
              <span>{option.name}</span>
            </div>
          ))}
          <PlanUsage/>
        </div>
      </div>
      <div className="w-full px-2 flex flex-col">
        <div className="w-full h-16 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Calendar size={18} />
            <span className="text-md text-black/70 dark:text-white/70 tracking-tight">
              {currentDate}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-black/70 dark:text-white/70">
            <Link href={"/"}>
              <House />
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <User />
          </div>
        </div>
        <Separator />
        <div className="w-full flex-grow mt-3">
          {activeUrl && (
            <iframe src={`dashboard/${activeUrl}`} className="w-full h-full border-none"></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
