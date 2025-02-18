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
    <div className="w-full py-10 border-t dark:border-white/20 h-fit  items-start flex px-20 justify-between z-50 max-md:px-5">
      <div className="flex flex-col">
        <div className="flex gap-1 mb-2">
          <Image src="/Logo.png" alt="EchoForms" width={30} height={26} />
          <span className="text-2xl font-bold text-black/70 dark:text-white tracking-tight">
            EchoForms
          </span>
        </div>
        <p className="text-sm max-md:text-[0.7rem] max-md:leading-3 text-black dark:text-white/50 mb-1">
          <Copyright
            className="mr-1 text-black dark:text-white/50 inline"
            size={15}
          />
          2025 EchoForms Private Limited.
        </p>
        <p className="text-black dark:text-white/50 text-sm">
          All rights reserved.
        </p>
      </div>
      <div className="flex gap-20">
        <div>
          <p className="font-bold">PAGES</p>
          <div className="flex flex-col dark:text-white/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm hover:text-blue-500 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">LEGAL</p>
          <div className="flex flex-col dark:text-white/50">
            <Link
              href={"/privacy-policy"}
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href={"/terms&conditions"}
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold">CONNECT</p>
          <div className="flex flex-col dark:text-white/50">
            <Link
              href={"/privacy-policy"}
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              Github
            </Link>
            <Link
              href={"/privacy-policy"}
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href={"/privacy-policy"}
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
