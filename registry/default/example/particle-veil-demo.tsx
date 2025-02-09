import { useState } from "react";
import ParticleVeil from "@/registry/default/ui/particle-veil";

export default function ParticleVeilDemo() {
  const techScheme = [
    "#22c55e", // Neon green
    "#06b6d4", // Cyan
    "#3b82f6", // Bright blue
    "#10b981", // Emerald
    "#ec4899", // Pink
    "#f97316", // Orange
    "#f59e0b", // Yellow
    "#ef4444", // Red
    "#d946ef", // Lavender
    "#8b5cf6", // Indigo
    "#7f1d1d", // Burnt umber
  ];

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-white dark:bg-slate-950">
      <ParticleVeil
        className="absolute inset-0"
        particleCount={200}
        particleColors={techScheme}
        interactionRadius={120}
        speed={0.8}
        sizeRange={[2, 5]}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-lg text-gray-400 dark:text-white/80">
          Move your cursor to interact with particles
        </p>
      </div>
    </div>
  );
}
