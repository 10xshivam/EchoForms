import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { pricingPlan } from "@/lib/data";

export default function Pricing() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 pb-32">
      <div className="p-8 border w-fit">
        <h3 className="text-7xl font-bold tracking-tight bg-gradient-to-b dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1.5">
          Plans and Pricing
        </h3>
      </div>
      <div className="flex justify-center items-center gap-10 pt-7">
        {pricingPlan.map((plan) => (
          <div key={plan.name} className="p-5 border w-fit rounded-lg">
            <div className="bg-zinc-900/10 dark:bg-zinc-900 p-5 px-7 flex flex-col rounded-xl space-y-2 w-[350px] ">
              <div>
                <p className="text-2xl tracking-tight font-medium mb-1 text-zinc-700 dark:text-zinc-200">
                  {plan.name.toUpperCase()}
                </p>
                <p className="text-base tracking-tight leading-tight mb-3 text-zinc-700 dark:text-zinc-200/50">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold !mb-2">
                  {plan.price}{" "}
                  <span className="block font-normal text-base text-zinc-100/30">
                    Billed monthly
                  </span>
                </p>
              </div>

              <Separator />
              <p className="text-md tracking-tight font-medium mb-2 text-black/70 dark:text-white/70">
                Features
              </p>
              <div className="flex flex-col ">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-1 mb-1 ">
                    <Check className="text-blue-800 inline" size={15} />
                    <span className="text-zinc-400 text-base">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-zinc-700 dark:bg-zinc-500/50 hover:bg-zinc-800 dark:hover:bg-zinc-400/30 text-white !mb-1">
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto text-zinc-100/50 text-sm">
        View a more detailed feature list on our{" "}
        <span className="hover:underline text-blue-700">pricing page</span>{" "}
      </p>
    </div>
  );
}
