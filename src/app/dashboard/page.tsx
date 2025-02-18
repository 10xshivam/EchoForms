"use client";

import { CreateForm } from "@/components/CreateForm";
import Forms from "@/components/Forms";
import Navbar from "@/components/Navbar";
import LimitCard from "@/components/LimitCard";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
interface usageInterface {
  createdForms: number;
  totalSubmissions: number;
  plan: string;
}

export default function Dashboard() {
  const [usage, setUsage] = useState<usageInterface | null>(null);

  useEffect(() => {
    async function fetchUsage() {
      const res = await axios.get(`/api/getUsage`);
      const data = await res.data;
      setUsage(data);
    }
    fetchUsage();
  }, []);

  if (!usage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="text-black dark:text-white animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-28 pb-10">
      <Navbar />
      <div className="px-24">
        <div className="flex  justify-between">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1">
            Dashboard
          </h2>
        </div>
        <div className="flex w-full mt-5 gap-5">
          <LimitCard
            title="Submissions limit"
            used={usage.totalSubmissions}
            limit={usage.plan === "Basic" ? 500 : 50000}
          />
          <LimitCard
            title="Form limit"
            used={usage.createdForms}
            limit={usage.plan === "Basic" ? 5 : 50}
          />
          <Card className="border p-7 flex  gap-8 dark:bg-zinc-700/40 border-none min-w-80 items-center rounded-xl">
            <div>
              <h3 className="text-lg font-semibold">CURRENT PLAN</h3>
              <p className="text-3xl font-bold italic text-zinc-500 my-2">
                {usage.plan === "free" ? "₹0" : "₹499"}
              </p>
            </div>
            <div className="w-[157px] h-[157px]  border-[13px] border-zinc-600/10 dark:border-zinc-600 rounded-full flex justify-center items-center">
              <p className="font-semibold text-3xl text-blue-600">
                {usage.plan}
              </p>
            </div>
          </Card>
        </div>
        <div className="pt-10">
          <div className="flex justify-between items-baseline mb-3  ">
            <h4 className="text-3xl font-semibold">Forms</h4>
            <CreateForm />
          </div>
          <Separator />
          <Forms />
        </div>
      </div>
    </div>
  );
}
