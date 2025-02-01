import { Copyright } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full h-16 border-t-2 border-white/20  bg-black/60 items-center flex px-7 justify-between z-50 max-md:px-5">
      <div className="flex justify-center items-center gap-0.5 text-white/50">
        <Copyright className="w-5 max-md:mr-1"  />
        <p className="text-sm max-md:text-[0.7rem] max-md:leading-3">2025 Quick Report, All Rights Reserved.</p>
      </div>

      <div className="flex justify-center items-center gap-1">
        <Link href={"https://github.com/shivam-tsx/Safe-Report"} className="rounded-md hover:bg-white/10 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.3}
            >
              <path
                strokeDasharray={32}
                strokeDashoffset={32}
                d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.7s"
                  values="32;0"
                ></animate>
              </path>
              <path
                strokeDasharray={10}
                strokeDashoffset={10}
                d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.8s"
                  dur="0.2s"
                  values="10;0"
                ></animate>
              </path>
            </g>
          </svg>
        </Link>
        <Link href={"https://www.linkedin.com/in/shivam-coder/"} className="rounded-md hover:bg-white/10 p-1" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2M8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12a1.57 1.57 0 1 1 0 3.12m12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z"
            ></path>
          </svg>
        </Link>
        <Link href={"https://x.com/codrshivam"} className="rounded-md hover:bg-white/10 p-1" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}