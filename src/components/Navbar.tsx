import Image from "next/image";
import React from "react";
// import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import User from "./User";


export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 w-full h-16 border-b border-black/10 dark:border-white/10  backdrop-blur-xl items-center flex px-7 justify-between z-50">
      <div className="flex justify-center items-center gap-1">
        <Image src="/Logo.png" alt="EchoForms" width={26} height={26} />
        <span className="text-xl font-bold text-black/70 dark:text-white/70 tracking-tighter">EchoForms</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        {!user ? 
        (<Link href="/sign-up">
          <Button className="bg-zinc-700 hover:bg-zinc-800 text-white text-sm">
            Sign up
          </Button>
        </Link>) :
          <>
        <Link href="/dashboard">
        <Button className="bg-transparent border hover:border-none border-zinc-100/10 hover:bg-zinc-800 text-white text-sm ">
          <LayoutDashboard/>
          Dashboard
        </Button>
      </Link>
       <User/>
          </>
      
        }
      </div>
    </nav>
  );
}
