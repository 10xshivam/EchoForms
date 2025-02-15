'use client';

import { Card } from "@/components/ui/card";
import Progress from "./ui/progress";

interface LimitCardProps {
  title: string;
  used: number;
  limit: number;
}

export default function LimitCard({ title, used, limit }: LimitCardProps) {
  const percentageUsed = (used / limit) * 100;

  return (
      <Card className="p-7 flex flex-col gap-3 rounded-none min-w-80 items-center ">
        <h3 className="text-lg font-semibold">{title.toUpperCase()}</h3>
        <p className="text-3xl font-semibold my-2">
          {used} <span className="text-gray-500">/ {limit}</span>
        </p>
        <Progress value={percentageUsed}/>
      </Card>
  );
}
