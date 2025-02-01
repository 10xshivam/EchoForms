"use client"
import { Copyright, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full h-16 border-t-2 dark:border-white/20  dark:bg-black/60 items-center flex px-7 justify-between z-50 max-md:px-5">
      <div className="flex justify-center items-center gap-0.5 text-white/50">
        <Copyright className="w-5 max-md:mr-1 text-black dark:text-white"/>
        <p className="text-sm max-md:text-[0.7rem] max-md:leading-3 text-black dark:text-white ">2025 EchoForms, All Rights Reserved.</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link href={"https://github.com/shivam-tsx/Safe-Report"} className="text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white">
          <Github/>
        </Link>
        <Link href={"https://x.com/codrshivam"} className="text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white" >
          <Twitter/>
        </Link>
      </div>
    </div>
  );
}