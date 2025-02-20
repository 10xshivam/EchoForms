"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { termsAndConditionsData } from "@/lib/data"; 

export default function TermsAndConditions() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-40  max-md:pt-28 max-md:pb-0">
      <Navbar />
      <div className="w-full justify-center items-center mb-10 flex flex-col max-md:px-5">
        <h3 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-white/50 bg-clip-text text-transparent py-1 max-md:text-3xl">
          Terms and Conditions 
        </h3>
        <p className="text-zinc-500 text-base text-center mt-3 tracking-tight max-w-2xl">
          Please read these Terms and Conditions carefully before using EchoForms.
        </p>
      </div>
      <div className="border w-full max-w-[800px] p-10 flex-col gap-8 flex mb-28 max-md:border-none max-md:mb-5">
        {termsAndConditionsData.map((section, index) => (
          <div key={index} className="mb-8">
            <h4 className="text-xl font-semibold mb-2 max-md:text-center">{section.title}</h4>
            <div
              className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed max-md:text-center"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}