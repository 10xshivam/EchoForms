import {
  Bot,
  Cable,
  ChartSpline,
  FileDown,
  QrCode,
  Sparkles,
} from "lucide-react";
import React from "react";

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

export default function Features() {
  return (
    <div className=" w-full rounded-2xl p-10">
      <div className="p-8 border w-fit">
        <h3 className="text-7xl text-center font-bold tracking-tight bg-gradient-to-b dark:from-white dark:to-white/50 bg-clip-text text-transparent">
          Features That Matter !
        </h3>
      </div>
      <div className="flex pt-12 h-[560px] gap-5">
        <div className="bg-zinc-700 rounded-lg h-full w-3"></div>
      <div className="grid grid-cols-2 gap-7 ">
        {features.map((feature, index) => (
          <div key={index} className="p-4 border rounded-xl bg-zinc-700/5">
            <div className="group relative flex overflow-hidden rounded-2xl bg-zinc-900/10 dark:bg-zinc-900 p-6 transition-all hover:bg-zinc-900/20 dark:hover:bg-zinc-800/80 max-md:p-5 gap-3">
              <div className="flex px-5 items-center justify-center rounded-xl bg-zinc-500/10">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-tight text-zinc-500 dark:text-zinc-400 ">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
