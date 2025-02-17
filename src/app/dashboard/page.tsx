"use client";

import { CreateForm } from "@/components/CreateForm";
import Forms from "@/components/Forms";
import Navbar from "@/components/Navbar";
import LimitCard from "@/components/LimitCard";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const [usage, setUsage] = useState({
    createdForms: 0,
    totalSubmissions: 0,
    plan: "Basic",
  });
  // const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchUsage() {
      const res = await axios.get(`/api/getUsage`);
      const data = await res.data;
      setUsage(data);
    }
    // async function fetchSubmissionCounts() {
    //   const res = await axios.get(`/api/forms/submissions/today`);
    //   const data = await res.data
    //   console.log(data)
    //   setCount(data);
    // }
    fetchUsage();
    // fetchSubmissionCounts()
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
            <div className="border p-7 flex flex-col gap-3 min-w-80 items-center">
              <h3 className="text-lg font-semibold">CURRENT PLAN</h3>
              <p className="text-3xl font-semibold my-2">{usage.plan === "free"? "₹0" : "₹499"}</p>
              <div className="px-[44px] py-[50px]  border-[13px] border-zinc-700 rounded-full ">
                <p className="m-auto font-semibold text-3xl">{usage.plan === "Basic" ? "Basic" : "Pro"}</p>
              </div>
            </div>
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
