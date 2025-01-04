import React from "react";

interface NeumorphismLoaderProps {
  progress?: number;
  color?: string;
}

export default function NeumorphismLoader({
  progress = 51,
  color = "#00ff87",
}: NeumorphismLoaderProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-40 w-40">
      <div className="absolute -inset-4 animate-pulse rounded-full bg-gray-200/50 dark:bg-gray-700/20" />

      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-gray-100 to-white shadow-[inset_0px_5px_15px_rgba(0,0,0,0.15)] dark:from-[#1a1a1a] dark:to-[#222] dark:shadow-[inset_0px_0px_20px_rgba(0,0,0,0.7)]">
        <div className="absolute -top-[40%] left-[60%] h-1/2 w-1/4 rotate-45 bg-gradient-to-b from-white/10 to-transparent blur-sm dark:from-white/5" />
      </div>

      <svg
        className="absolute h-full w-full animate-[spin_2s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <circle
          className="stroke-gray-200 transition-all duration-300 dark:stroke-[#2a2a2a]"
          strokeWidth="4"
          fill="none"
          r="45"
          cx="50"
          cy="50"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.2;0.4;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          r="45"
          cx="50"
          cy="50"
          style={{
            stroke: color,
            strokeOpacity: 0.2,
            filter: "blur(2px)",
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
        <circle
          className="transition-all duration-500"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          r="45"
          cx="50"
          cy="50"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 animate-pulse blur-md">
            <span
              className="text-3xl font-medium opacity-50"
              style={{ color: color }}
            >
              {progress}%
            </span>
          </div>
          <span className="text-3xl font-medium" style={{ color: color }}>
            {progress}%
          </span>
        </div>
      </div>
      <div
        className="absolute -inset-1 rounded-full opacity-20 blur-md"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
