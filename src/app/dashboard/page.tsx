"use client";

import { CreateForm } from "@/components/CreateForm";
import Forms from "@/components/Forms";
import Navbar from "@/components/Navbar";
import LimitCard from "@/components/LimitCard";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useUser();
  const [usage, setUsage] = useState({
    createdForms: 0,
    totalSubmissions: 0,
    plan: "Basic",
  });

  useEffect(() => {
    async function fetchUsage() {
      const res = await axios.get(`/api/getUsage`);
      const data = await res.data;
      setUsage(data);
    }
    fetchUsage();
  }, []);
  
  return (
    <div className="w-full min-h-screen pt-32">
      <Navbar />
      <div className="px-24">
        <div className="flex  justify-between">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1">
            Hello {user?.firstName}
          </h2>
        </div>
        <div className="flex w-full mt-5 gap-5">
          <LimitCard
            title="Submissions limit"
            used={usage.totalSubmissions}
            limit={usage.plan === "Basic" ? 500 : 50000}
            /> 
          <LimitCard title="Form limit" used={usage.createdForms} limit={usage.plan === "Basic" ? 5 : 50} />
            <Card className="border p-7 flex flex-col gap-3 min-w-80 items-center rounded-xl">
              <h3 className="text-lg font-semibold">CURRENT PLAN</h3>
              <p className="text-3xl font-semibold my-2">{usage.plan === "free" ? "₹0" : "₹499"}</p>
              <div className="w-[157px] h-[157px]  border-[13px] border-zinc-600 rounded-full flex justify-center items-center">
                <p className="font-semibold text-3xl text-blue-600">{usage.plan}</p>
              </div>
            </Card>
        </div>
        <div className="pt-10">
          <div className="flex justify-between items-center mb-3">
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
