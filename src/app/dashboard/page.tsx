"use client";

import { CreateForm } from "@/components/CreateForm";
import Forms from "@/components/Forms";
import Navbar from "@/components/Navbar";
import LimitCard from "@/components/LimitCard";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { TextQuote } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
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
          <div className="border p-7 flex flex-col gap-3 min-w-80">
            <div className="p-2 border w-fit">
              <TextQuote size={30} />
            </div>
            <h3>TOTAL SUBMISSIONS</h3>
            <p className="font-semibold text-4xl">0</p>
          </div>
          {/* <div className="border p-7 flex flex-col gap-3 min-w-80">
            <div className="p-2 border w-fit">
              <TextQuote size={30} />
            </div>
            <h3>SUBMISSIONS LIMIT</h3>
            <p className="font-semibold text-4xl">0</p>
          </div> */}
          <LimitCard title="Submissions limit" used={2} limit={100}/>
          <LimitCard title="Form limit" used={2} limit={10}/>
          
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
