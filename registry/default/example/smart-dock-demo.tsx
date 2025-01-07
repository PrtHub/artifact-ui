"use client";

import * as React from "react";
import {
  SmartDock,
  type DockVariant,
  type HoverStyle,
} from "@/registry/default/ui/smart-dock";
import {
  GlobeIcon,
  BrainIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const variants: {
  name: string;
  value: DockVariant;
  className: string;
  textClass: string;
}[] = [
  {
    name: "Modern",
    value: "modern",
    className:
      "bg-zinc-900/80 hover:bg-zinc-800/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80",
    textClass: "text-white",
  },
  {
    name: "Glass",
    value: "glass",
    className:
      "bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-sm",
    textClass: "text-black dark:text-white",
  },
  {
    name: "Wooden",
    value: "wooden",
    className:
      "bg-gradient-to-t from-amber-900/30 to-amber-800/20 hover:from-amber-800/30 hover:to-amber-700/20",
    textClass: "text-amber-800 dark:text-amber-100",
  },
  {
    name: "Metallic",
    value: "metallic",
    className:
      "bg-gradient-to-t from-slate-400/30 to-slate-300/20 hover:from-slate-300/30 hover:to-slate-200/20 dark:from-slate-600/30 dark:to-slate-500/20",
    textClass: "text-slate-900 dark:text-white",
  },
  {
    name: "Neon",
    value: "neon",
    className:
      "bg-black/40 border border-fuchsia-500/50 hover:border-fuchsia-400/60 dark:bg-black/60",
    textClass: "text-fuchsia-500 dark:text-fuchsia-300",
  },
  {
    name: "Chalk",
    value: "chalk",
    className:
      "bg-slate-50/90 hover:bg-white/90 dark:bg-slate-900/90 dark:hover:bg-slate-800/90 border border-dashed border-slate-300 dark:border-slate-600",
    textClass: "text-slate-900 dark:text-white",
  },
  {
    name: "Paper",
    value: "paper",
    className:
      "bg-gradient-to-t from-stone-100/90 to-white/80 hover:from-stone-50/90 hover:to-white/90 dark:from-stone-900/90 dark:to-stone-800/80",
    textClass: "text-stone-900 dark:text-white",
  },
  {
    name: "Canvas",
    value: "canvas",
    className:
      "bg-gradient-to-t from-neutral-100/95 to-neutral-50/90 hover:from-neutral-50/95 hover:to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90",
    textClass: "text-neutral-900 dark:text-white",
  },
  {
    name: "Frost",
    value: "frost",
    className:
      "bg-gradient-to-t from-blue-100/30 to-blue-50/20 hover:from-blue-50/30 hover:to-white/20 dark:from-blue-900/30 dark:to-blue-800/20",
    textClass: "text-blue-900 dark:text-blue-100",
  },
  {
    name: "Sunset",
    value: "sunset",
    className:
      "bg-gradient-to-t from-orange-500/20 via-pink-500/20 to-purple-500/20 hover:from-orange-400/30 hover:via-pink-400/30 hover:to-purple-400/30",
    textClass: "text-white",
  },
  {
    name: "Ocean",
    value: "ocean",
    className:
      "bg-gradient-to-t from-cyan-500/20 to-blue-500/20 hover:from-cyan-400/30 hover:to-blue-400/30",
    textClass: "text-cyan-900 dark:text-cyan-100",
  },
  {
    name: "Forest",
    value: "forest",
    className:
      "bg-gradient-to-t from-green-800/20 to-emerald-600/20 hover:from-green-700/30 hover:to-emerald-500/30",
    textClass: "text-emerald-900 dark:text-emerald-100",
  },
  {
    name: "Desert",
    value: "desert",
    className:
      "bg-gradient-to-t from-yellow-700/20 to-orange-600/20 hover:from-yellow-600/30 hover:to-orange-500/30",
    textClass: "text-orange-900 dark:text-orange-100",
  },
  {
    name: "Cosmic",
    value: "cosmic",
    className:
      "bg-gradient-to-t from-violet-900/30 via-purple-800/20 to-fuchsia-900/30 hover:from-violet-800/40 hover:via-purple-700/30 hover:to-fuchsia-800/40",
    textClass: "text-violet-800 dark:text-violet-100",
  },
  {
    name: "Cyber",
    value: "cyber",
    className:
      "bg-gradient-to-t from-teal-500/20 via-cyan-500/10 to-blue-500/20 hover:from-teal-400/30 hover:via-cyan-400/20 hover:to-blue-400/30",
    textClass: "text-cyan-800 dark:text-cyan-100",
  },
];

const hoverStyles: {
  category: string;
  styles: { name: string; value: HoverStyle }[];
}[] = [
  {
    category: "Scaling",
    styles: [
      { name: "Default", value: "default" },
      { name: "Subtle", value: "subtle" },
      { name: "Dramatic", value: "dramatic" },
      { name: "Smooth", value: "smooth" },
      { name: "Bouncy", value: "bouncy" },
      { name: "Elastic", value: "elastic" },
      { name: "Quick", value: "quick" },
      { name: "Lazy", value: "lazy" },
    ],
  },
  {
    category: "Movement",
    styles: [
      { name: "Slide", value: "slide" },
      { name: "Magnetic", value: "magnetic" },
      { name: "Float", value: "float" },
      { name: "Ripple", value: "ripple" },
      { name: "Groove", value: "groove" },
      { name: "Wave", value: "wave" },
      { name: "Orbit", value: "orbit" },
      { name: "Pulse", value: "pulse" },
    ],
  },
];

const dockItems = [
  {
    icon: <GlobeIcon className="size-6 text-black dark:text-white" />,
    label: "Browser",
  },
  {
    icon: <SparklesIcon className="size-6 text-black dark:text-white" />,
    label: "AI Assistant",
  },
  {
    icon: <PaletteIcon className="size-6 text-black dark:text-white" />,
    label: "Design",
  },
  {
    icon: <RocketIcon className="size-6 text-black dark:text-white" />,
    label: "Launch",
  },
  {
    icon: <TerminalIcon className="size-6 text-black dark:text-white" />,
    label: "Terminal",
  },
  {
    icon: <BrainIcon className="size-6 text-black dark:text-white" />,
    label: "Learn",
  },
];

export default function SmartDockDemo() {
  const [variant, setVariant] = React.useState<DockVariant>("modern");
  const [hoverStyle, setHoverStyle] = React.useState<HoverStyle>("default");

  return (
    <div className="z-30 flex min-h-[500px] w-full flex-col items-center justify-between gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {variants.map((v) => (
            <button
              key={v.value}
              onClick={() => setVariant(v.value)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
                "border border-white/10 backdrop-blur-sm dark:border-white/5",
                v.value === variant && [
                  "scale-105",
                  "after:absolute after:inset-0 after:rounded-lg after:ring-2 after:ring-primary/50",
                  "before:absolute before:inset-0 before:rounded-lg before:ring-4 before:ring-primary/10",
                ],
                v.className,
                v.textClass,
              )}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          {hoverStyles.map((category) => (
            <div
              key={category.category}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {category.styles.map((h) => (
                  <button
                    key={h.value}
                    onClick={() => setHoverStyle(h.value)}
                    className={cn(
                      "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
                      "border border-white/10 backdrop-blur-sm dark:border-white/5",
                      "bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30",
                      "text-black dark:text-white",
                      h.value === hoverStyle && [
                        "scale-105",
                        "after:absolute after:inset-0 after:rounded-lg after:ring-2 after:ring-primary/50",
                        "before:absolute before:inset-0 before:rounded-lg before:ring-4 before:ring-primary/10",
                      ],
                    )}
                  >
                    {h.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SmartDock
        items={dockItems}
        className="relative"
        variant={variant}
        hoverStyle={hoverStyle}
      />
    </div>
  );
}
