"use client";

import React, { useState } from "react";
import PatternLibrary, {
  Pattern,
} from "@/registry/default/ui-canvas/pattern-library";

const defaultPatterns: Pattern[] = [
  {
    id: "1",
    name: "Dots Grid",
    type: "dots",
    size: 4,
    spacing: 20,
    rotation: 0,
    opacity: 0.5,
    color: "#6366f1",
  },
  {
    id: "2",
    name: "Square Grid",
    type: "squares",
    size: 2,
    spacing: 20,
    rotation: 0,
    opacity: 0.3,
    color: "#f43f5e",
  },
  {
    id: "3",
    name: "Diagonal Lines",
    type: "lines",
    size: 1,
    spacing: 15,
    rotation: 45,
    opacity: 0.4,
    color: "#10b981",
  },
  {
    id: "4",
    name: "Circles",
    type: "circles",
    size: 8,
    spacing: 24,
    rotation: 0,
    opacity: 0.3,
    color: "#f59e0b",
  },
  {
    id: "5",
    name: "Triangle Pattern",
    type: "triangles",
    size: 6,
    spacing: 20,
    rotation: 30,
    opacity: 0.35,
    color: "#64748b",
  },
  {
    id: "6",
    name: "Diamond Grid",
    type: "diamonds",
    size: 8,
    spacing: 24,
    rotation: 0,
    opacity: 0.4,
    color: "#ec4899",
  },
];

export default function PatternLibraryDemo() {
  const [currentPattern, setCurrentPattern] = useState<Pattern>(
    defaultPatterns[0],
  );
  const [patterns, setPatterns] = useState<Pattern[]>(defaultPatterns);

  const getPatternSvg = (pattern: Pattern) => {
    const shapes: Record<string, string> = {
      dots: `<circle cx="${pattern.spacing / 2}" cy="${pattern.spacing / 2}" r="${
        pattern.size / 2
      }" fill="${pattern.color}"/>`,
      squares: `<rect x="${pattern.spacing / 2 - pattern.size / 2}" y="${
        pattern.spacing / 2 - pattern.size / 2
      }" width="${pattern.size}" height="${pattern.size}" fill="${pattern.color}"/>`,
      lines: `<line x1="0" y1="0" x2="${pattern.spacing}" y2="${pattern.spacing}" stroke="${
        pattern.color
      }" stroke-width="${pattern.size}"/>`,
      circles: `<circle cx="${pattern.spacing / 2}" cy="${pattern.spacing / 2}" r="${
        pattern.size
      }" fill="none" stroke="${pattern.color}" stroke-width="${pattern.size / 4}"/>`,
      triangles: `<polygon points="${pattern.spacing / 2},${
        pattern.spacing / 2 - pattern.size
      } ${pattern.spacing / 2 + pattern.size},${pattern.spacing / 2 + pattern.size} ${
        pattern.spacing / 2 - pattern.size
      },${pattern.spacing / 2 + pattern.size}" fill="${pattern.color}"/>`,
      grid: `<path d="M ${pattern.spacing} 0 L 0 0 0 ${pattern.spacing}" fill="none" stroke="${
        pattern.color
      }" stroke-width="${pattern.size}"/>`,
      diamonds: `<path d="M ${pattern.spacing / 2} ${pattern.spacing / 2 - pattern.size} 
        L ${pattern.spacing / 2 + pattern.size} ${pattern.spacing / 2} 
        L ${pattern.spacing / 2} ${pattern.spacing / 2 + pattern.size} 
        L ${pattern.spacing / 2 - pattern.size} ${pattern.spacing / 2} Z" fill="${pattern.color}"/>`,
    };

    return `<svg width="${pattern.spacing}" height="${pattern.spacing}" viewBox="0 0 ${
      pattern.spacing
    } ${pattern.spacing}" xmlns="http://www.w3.org/2000/svg">
      ${shapes[pattern.type]}
    </svg>`;
  };

  return (
    <div className={`flex w-full flex-col gap-8 p-4 md:flex-row`}>
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground/90 dark:text-white/90">
            Pattern Library
          </h3>
        </div>
        <PatternLibrary
          value={currentPattern}
          patterns={patterns}
          onValueChange={setCurrentPattern}
          onPatternsChange={setPatterns}
        />
      </div>

      <div className="z-50 flex flex-1 flex-col gap-4 bg-white shadow-md dark:bg-black">
        <div className="rounded-lg border bg-card p-4 dark:border-white/10 dark:bg-black/40">
          <h3 className="mb-2 font-medium text-foreground/90 dark:text-white/90">
            Current Pattern Settings
          </h3>
          <pre className="text-sm text-muted-foreground dark:text-white/50">
            {JSON.stringify(currentPattern, null, 2)}
          </pre>
        </div>

        <div className="z-50 rounded-lg border bg-white p-4 shadow-md dark:border-white/10 dark:bg-black">
          <h3 className="mb-2 font-medium text-foreground/90 dark:text-white/90">
            Preview
          </h3>
          <div
            className="h-48 rounded-md border bg-white dark:border-white/10 dark:bg-black"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                getPatternSvg(currentPattern),
              )}")`,
              backgroundRepeat: "repeat",
              transform: `rotate(${currentPattern.rotation}deg)`,
              opacity: currentPattern.opacity,
            }}
          />
        </div>
      </div>
    </div>
  );
}
