"use client";

import React, { useState } from "react";
import StudioShareModule from "@/registry/default/ui-canvas/studio-share-module";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function StudioShareModuleDemo() {
  const [theme, setTheme] = useState<
    | "neon"
    | "glassmorphism"
    | "gradient"
    | "minimal"
    | "cyberpunk"
    | "aurora"
    | "retro"
    | "synthwave"
    | "nature"
    | "ocean"
  >("neon");
  const [position, setPosition] = useState<"center" | "bottom-right">("center");
  const [darkMode, setDarkMode] = useState(false);

  const demoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/components/studio-share-module`;
  const demoTitle = "UI Canvas Components";
  const demoDescription = "Experience the future of UI components with our stunning collection!";

  const themes = [
    { name: "neon", emoji: "💫", label: "Neon" },
    { name: "glassmorphism", emoji: "🌟", label: "Glass" },
    { name: "gradient", emoji: "🎨", label: "Gradient" },
    { name: "minimal", emoji: "⚪", label: "Minimal" },
    { name: "cyberpunk", emoji: "🤖", label: "Cyberpunk" },
    { name: "aurora", emoji: "🌈", label: "Aurora" },
    { name: "retro", emoji: "🕹️", label: "Retro" },
    { name: "synthwave", emoji: "🌆", label: "Synthwave" },
    { name: "nature", emoji: "🌿", label: "Nature" },
    { name: "ocean", emoji: "🌊", label: "Ocean" },
  ];

  const positions = [
    { name: "center", label: "Center" },
    { name: "bottom-right", label: "Bottom Right" },
  ];

  return (
    <div className="z-50 flex min-h-[400px] w-full flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <motion.button
                key={t.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(t.name as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all ${theme === t.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
                  }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {positions.map((p) => (
              <motion.button
                key={p.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPosition(p.name as any)}
                className={`rounded-xl px-4 py-2 text-sm transition-all ${position === p.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
                  }`}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <StudioShareModule
        url={demoUrl}
        title={demoTitle}
        description={demoDescription}
        theme={theme}
        position={position}
        darkMode={darkMode}
      />
    </div>
  );
}
