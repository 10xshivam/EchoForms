import {
  Bell,
  Bot,
  ChartSpline,
  FileDown,
  QrCode,
  Sparkles,
} from "lucide-react";
import React from "react";

export const features = [
  {
    title: "AI-Powered Form Generation",
    description:
      "Create any form instantly with a single prompt. No manual setup—just describe your needs, and EchoForms builds it for you.",
    icon: <Bot size={35} />,
  },
  {
    title: "Customize Your Forms",
    description:
      "Modify fields, apply validations, and adjust form settings effortlessly with an intuitive UI.",
    icon: <Sparkles size={30} />,
  },
  {
    title: "Generate & Share QR Codes",
    description:
      "Get a unique shareable link or QR code for every form, making it easy to distribute and collect responses.",
    icon: <QrCode size={35} />,
  },
  {
    title: "Real-Time Response Tracking",
    description:
      "Monitor submissions as they happen with detailed analytics, ensuring you stay updated on user responses.",
    icon: <ChartSpline size={35} />,
  },
  {
    title: "Instant Email Alerts",
    description:
      "Enable email notifications to receive alerts whenever someone submits a response to your form.",
    icon: <Bell size={35} />,
  },
  {
    title: "Seamless Data Export",
    description:
      "Download all submissions in CSV format for easy reporting and analysis. Manage your data efficiently.",
    icon: <FileDown size={35} />,
  },
];

export default function Features() {
  return (
    <div className=" w-full rounded-2xl p-10 max-md:p-6">
      <div className="p-8 border w-fit max-md:p-4">
        <h3 className="text-7xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-black/50  dark:from-white dark:to-white/50 bg-clip-text text-transparent max-md:text-3xl ">
          Features That Matter !
        </h3>
      </div>
      <div className="flex pt-12 h-[560px] gap-5 max-md:pt-6 max-md:h-fit">
        <div className="bg-zinc-600/40 dark:bg-zinc-700 rounded-lg h-full w-3 max-md:hidden"></div>
      <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1 max-md:gap-4 max-md:px-2">
        {features.map((feature, index) => (
          <div key={index} className="p-4 border rounded-xl bg-zinc-700/5 max-md:p-3">
            <div className="group relative flex overflow-hidden rounded-2xl bg-zinc-900/10 dark:bg-zinc-900 p-6 transition-all hover:bg-zinc-900/20 dark:hover:bg-zinc-800/80 max-md:p-4 max-md:rounded-lg gap-3">
              <div className="flex px-5 items-center justify-center rounded-xl bg-zinc-500/10 max-md:hidden">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2 max-md:text-[17px] max-md:leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-tight text-zinc-500 dark:text-zinc-400 max-md:text-xs">
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
