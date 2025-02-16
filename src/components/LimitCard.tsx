'use client';

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LimitCardProps {
  title: string;
  used: number;
  limit: number;
}

export default function LimitCard({ title, used, limit }: LimitCardProps) {
  const percentageUsed = (used / limit) * 100;

  return (
      <Card className="p-6 text-center rounded-none">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-2">
          {used} <span className="text-gray-500">/ {limit}</span>
        </p>
        <p className="text-sm text-gray-500">{percentageUsed.toFixed(0)}% used</p>
        <div className="mt-4">
          <Progress value={percentageUsed} className="h-2" />
        </div>
      </Card>
  );
}
