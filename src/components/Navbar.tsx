import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Github, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import User from "./User";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 w-full h-16 border-b border-black/10 dark:border-white/10  backdrop-blur-xl items-center flex px-8 justify-between z-50 max-md:px-4">
      <div className="flex justify-center items-center gap-1">
        <Image src="/Logo.png" alt="EchoForms" width={26} height={26} />
        <span className="text-xl font-bold text-black/70 dark:text-white/70 tracking-tight">
          EchoForms
        </span>
      </div>
      <div className="flex justify-center items-center gap-4 max-md:gap-2">
        {!user ? (
          <>
            <Link href="/login">
              <Button className="bg-zinc-700 hover:bg-zinc-800 text-white text-sm max-md:h-8 max-md:px-3 max-md:text-xs">
                Log in
              </Button>
            </Link>
            <Link
              href={"https://github.com/shivam-tsx/Safe-Report"}
              className="text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white max-md:hidden"
            >
              <Github  />
            </Link>
            <ThemeToggle />
          </>
        ) : (
          <>
            <Link href="/">
                <Home/> 
            </Link>
            <Link href="/dashboard">
            <LayoutDashboard className="md:hidden mx-2"/>
              <Button className="bg-transparent border hover:border-none  dark:border-zinc-100/10 hover:bg-zinc-800/10  dark:hover:bg-zinc-800 text-black dark:text-white text-sm max-md:hidden">
                <LayoutDashboard />
                Dashboard
              </Button>
            </Link>
            <User />
          </>
        )}
      </div>
    </nav>
  );
}
