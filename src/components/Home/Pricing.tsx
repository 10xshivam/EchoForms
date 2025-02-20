import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { useRouter } from "next/navigation";
import axios from "axios";
import UpgradePlan from "../UpgradePlan";
import { useUser } from "@clerk/nextjs";

interface usageInterface {
  createdForms: number;
  totalSubmissions: number;
  plan: string;
}

export default function Pricing() {
  const router = useRouter();
  const { isSignedIn } = useUser(); 
  const { user } = useUser();
  const [usage, setUsage] = useState<usageInterface | null>(null);

  useEffect(() => {
    async function fetchUsage() {
      try {
        if (!user) return; 
        const res = await axios.get(`/api/getUsage`);
        const data = await res.data;
        setUsage(data);
      } catch (error) {
        console.error("Error fetching usage data:", error);
        setUsage(null); 
      }
    }

    fetchUsage();
  }, [user]);

  const subscriptionStatus = usage?.plan;

  const handleButtonClick = (action: string) => {
    if (action === "redirect") {
      router.push("/dashboard");
    } else if (action === "sign-in") {
      router.push("/login"); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 pb-32 max-md:p-0 max-md:px-6 max-md:mt-5 max-md:gap-0">
      <div className="p-8 border w-fit max-md:p-3 max-md:w-full">
        <h3 className="text-7xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1.5 max-md:text-3xl max-md:text-center">
          Plans and Pricing
        </h3>
      </div>
      <div className="flex justify-center items-center gap-10 pt-7 flex-wrap max-md:flex-col max-md:px-1 max-md:gap-5 ">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="p-5 border w-fit rounded-lg max-md:p-3">
            <div className="bg-zinc-900/10 dark:bg-zinc-900 p-5 px-7 flex flex-col rounded-xl space-y-2 w-[350px] max-md:w-full max-md:p-4">
              <div>
                <p className="text-2xl tracking-tight font-medium mb-1 text-zinc-700 dark:text-zinc-200 max-md:text-xl max-md:mb-0.5">
                  {plan.name.toUpperCase()}
                </p>
                <p className="text-base tracking-tight leading-tight mb-3 text-zinc-700 dark:text-zinc-200/50 max-md:text-sm">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold !mb-2 max-md:!mb-1">
                  {plan.price}{" "}
                  <span className="block font-normal text-base text-zinc-700/80 dark:text-zinc-100/30 max-md:text-xs">
                    Billed monthly
                  </span>
                </p>
              </div>
              <Separator />
              <p className="text-md tracking-tight font-medium mb-2 text-black/70 dark:text-white/70 max-md:text-base">
                Features
              </p>
              <div className="flex flex-col">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 mb-1">
                    <Check className="text-blue-800 inline" size={15} />
                    <span className="text-zinc-700/60 dark:text-zinc-400 text-base max-md:text-xs">{feature}</span>
                  </div>
                ))}
              </div>
              {plan.action === "redirect" && (
                <Button
                  onClick={() => handleButtonClick(plan.action)}
                  className="bg-zinc-700 dark:bg-zinc-500/50 hover:bg-zinc-800 dark:hover:bg-zinc-400/30 text-white !mb-1"
                >
                  {plan.buttonText}
                </Button>
              )}
              {plan.action === "upgrade" && !isSignedIn && (
                <Button
                  onClick={() => handleButtonClick("sign-in")}
                  className="bg-gray-300 dark:bg-zinc-700 text-white"
                >
                  Log In to Upgrade
                </Button>
              )}
              {plan.action === "upgrade" && isSignedIn && subscriptionStatus === "Pro" && (
                <Button className="bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed !mb-1">
                  You already have the Pro Plan !
                </Button>
              )}
              {plan.action === "upgrade" && isSignedIn && subscriptionStatus !== "Pro" && (
                <UpgradePlan />
              )}
              {plan.action === "coming-soon" && (
                <Button
                  disabled
                  className="bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed !mb-1"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}