"use client";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

export default function Footer() {
  return (
    <div className="w-full py-10 border-t dark:border-white/20 h-fit  items-start flex px-20 justify-between z-50 max-md:p-6 max-md:gap-5 max-md:flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-2  max-md:mb-1">
          <Image
            src="/Logo.png"
            alt="EchoForms"
            width={30}
            height={30}
            className=" max-md:w-5 max-md:h-5"
          />
          <span className="text-2xl font-bold text-black/70 dark:text-white tracking-tight max-md:text-base">
            EchoForms
          </span>
        </div>
        <p className="text-sm text-black dark:text-white/50 mb-1 max-md:leading-tight max-md:text-xs max-md:mb-0">
          <Copyright
            className="mr-1 text-black dark:text-white/50 inline max-md:w-3 max-md:m-0 max-md:mr-0.5"
            size={15}
          />
          2025 EchoForms Private Limited.
        </p>
        <p className="text-black dark:text-white/50 text-sm max-md:text-xs">
          All rights reserved.
        </p>
      </div>
      <div className="flex gap-20 max-md:gap-11 ">
        <div>
          <p className="font-bold max-md:text-sm">PAGES</p>
          <div className="flex flex-col dark:text-white/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold max-md:text-sm">LEGAL</p>
          <div className="flex flex-col dark:text-white/50">
            <Link
              href={"/privacy-policy"}
              className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px]"
            >
              Privacy Policy
            </Link>
            <Link
              href={"/terms&conditions"}
              className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px] max-md:leading-tight"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
        <div className="">
          <p className="font-bold max-md:text-sm">CONNECT</p>
          <div className="flex flex-col dark:text-white/50">
            <Link
              href={"https://github.com/10xshivam"}
              target="_blank"
              className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs"
            >
              Github
            </Link>
            <Link
              href={"https://www.linkedin.com/in/codrshivam/"}
              target="_blank"
              className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs"
            >
              LinkedIn
            </Link>
            <Link
              href={"https://x.com/shivamcodes_"}
              target="_blank"
              className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
