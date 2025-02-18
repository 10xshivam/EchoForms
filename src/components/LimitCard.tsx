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
    <Card className="p-7 flex  gap-8 min-w-80 items-center rounded-2xl dark:bg-zinc-700/40 border-none">
      <div>
        <h3 className="text-base font-semibold">{title.toUpperCase()}</h3>
        <p className="text-3xl font-bold my-2 italic">
          {used} <span className="text-zinc-500">/ {limit}</span>
        </p>
      </div>
      <Progress value={percentageUsed} />
    </Card>
  );
}
