"use client";

import React from "react";
import { useState } from "react";
import BrushStyleSelector, {
  BrushPreset,
} from "@/registry/default/ui-canvas/brush-style-selector";
import { MoonIcon, SunIcon } from "lucide-react";

const defaultPresets: BrushPreset[] = [
  {
    id: "1",
    name: "Pencil",
    size: 2,
    opacity: 1,
    style: "round",
    hardness: 100,
    spacing: 1,
  },
  {
    id: "2",
    name: "Soft Brush",
    size: 20,
    opacity: 0.8,
    style: "round",
    color: "#3b82f6",
    hardness: 50,
    spacing: 1.2,
  },
  {
    id: "3",
    name: "Pixel Art",
    size: 15,
    opacity: 1,
    style: "square",
    color: "#10b981",
    hardness: 100,
    spacing: 1,
  },
  {
    id: "4",
    name: "Calligraphy",
    size: 12,
    opacity: 1,
    style: "round",
    color: "#6366f1",
    hardness: 90,
    angle: 45,
    spacing: 1,
  },
  {
    id: "5",
    name: "Watercolor",
    size: 30,
    opacity: 0.6,
    style: "round",
    color: "#ec4899",
    hardness: 30,
    spacing: 1.5,
  },
];

export default function BrushStyleSelectorDemo() {
  const [currentBrush, setCurrentBrush] = useState<BrushPreset>(
    defaultPresets[0],
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`flex w-full flex-col gap-8 p-4 md:flex-row ${isDarkMode ? "dark" : ""}`}
    >
      <div className="w-full max-w-sm space-y-4">
        <div className="z-20 flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground/90 dark:text-white/90">
            Brush Settings
          </h3>
        </div>

        <BrushStyleSelector
          value={currentBrush}
          presets={defaultPresets}
          onValueChange={setCurrentBrush}
          showAdvancedControls={true}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="rounded-lg border bg-card p-4 dark:border-white/10 dark:bg-black/40">
          <h3 className="mb-2 font-medium text-foreground/90 dark:text-white/90">
            Current Brush Settings
          </h3>
          <pre className="text-sm text-muted-foreground dark:text-white/50">
            {JSON.stringify(currentBrush, null, 2)}
          </pre>
        </div>

        <div className="rounded-lg border bg-card p-4 dark:border-white/10 dark:bg-black/40">
          <h3 className="mb-2 font-medium text-foreground/90 dark:text-white/90">
            Preview
          </h3>
          <div
            className="h-32 rounded-md border bg-white dark:border-white/10 dark:bg-black"
            style={{
              cursor: "crosshair",
            }}
          >
            <div
              className="flex h-full items-center justify-center"
              style={{
                opacity: currentBrush.opacity,
              }}
            >
              <div
                className={`rounded-${currentBrush.style === "square" ? "none" : "full"} bg-current`}
                style={{
                  width: currentBrush.size,
                  height: currentBrush.size,
                  backgroundColor:
                    currentBrush.color || (isDarkMode ? "white" : "black"),
                  filter:
                    currentBrush.hardness && currentBrush.hardness < 100
                      ? `blur(${(100 - currentBrush.hardness) / 8}px)`
                      : undefined,
                  transform: currentBrush.angle
                    ? `rotate(${currentBrush.angle}deg)`
                    : undefined,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
