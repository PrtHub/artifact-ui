"use client";

import { useState, useEffect } from "react";
import NeumorphismLoader from "../ui/neumorphism-loader";

const PRESET_COLORS = [
  "#00ff87",
  "#ff0099",
  "#00ffff",
  "#ff6b6b",
  "#ffd93d",
  "#6c5ce7",
];

export default function NeumorphismLoaderDemo() {
  const [progress, setProgress] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="z-40 space-y-8">
      <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-white p-12 shadow-2xl dark:bg-[#141414]">
        <NeumorphismLoader progress={progress} color={selectedColor} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            className="h-8 w-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#141414]"
            style={{
              backgroundColor: color,
              boxShadow:
                color === selectedColor ? `0 0 0 2px ${color}` : "none",
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
