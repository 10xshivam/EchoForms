"use client";

import * as React from "react";

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  const strokeDasharray = 100;
  const strokeDashoffset = strokeDasharray - (value / 100) * strokeDasharray;

  return (
    <div className="relative size-40 flex items-center justify-center max-md:size-24">
      <svg
        className="size-full rotate-180"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
        />
        {/* Progress Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-blue-600 dark:text-blue-500 transition-all duration-500"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Center Text */}
      <div className="absolute text-center">
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-500 max-md:text-sm">
          {value}%
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400 block">
          used
        </span>
      </div>
    </div>
  );
};

export default Progress;

