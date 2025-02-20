"use client";

import { Card } from "@/components/ui/card";
import Progress from "./ui/progress";

interface LimitCardProps {
  title: string;
  used: number;
  limit: number;
}

export default function LimitCard({ title, used, limit }: LimitCardProps) {
  const percentageUsed = Number(((used / limit) * 100).toFixed(2));

  return (
    <div className="border p-5 rounded-xl w-fit max-md:p-3">
      <Card className="p-7 flex  gap-8 md:min-w-80 items-center rounded-2xl dark:bg-zinc-700/40 border-none max-md:w-full max-md:gap-5 max-md:p-5">
        <div>
          <h3 className="text-base font-semibold max-md:text-sm">{title.toUpperCase()}</h3>
          <p className="text-3xl font-bold my-2 italic max-md:text-xl">
            {used} <span className="text-zinc-500">/ {limit}</span>
          </p>
        </div>
        <Progress value={percentageUsed} />
      </Card>
    </div>
  );
}
