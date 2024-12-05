"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Grid,
  Circle,
  Square,
  Triangle,
  Hash,
  Plus,
  Minus,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Diamond,
} from "lucide-react";

export type PatternType =
  | "dots"
  | "grid"
  | "lines"
  | "circles"
  | "squares"
  | "triangles"
  | "diamonds";

export interface Pattern {
  id: string;
  name: string;
  type: PatternType;
  size: number;
  spacing: number;
  rotation: number;
  opacity: number;
  color: string;
}

export interface PatternLibraryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: Pattern;
  patterns?: Pattern[];
  onValueChange?: (pattern: Pattern) => void;
  onPatternsChange?: (patterns: Pattern[]) => void;
  minSize?: number;
  maxSize?: number;
}

const defaultPatterns: Pattern[] = [
  {
    id: "1",
    name: "Dots Grid",
    type: "dots",
    size: 4,
    spacing: 20,
    rotation: 0,
    opacity: 0.5,
    color: "#94a3b8",
  },
  {
    id: "2",
    name: "Square Grid",
    type: "grid",
    size: 1,
    spacing: 20,
    rotation: 0,
    opacity: 0.3,
    color: "#64748b",
  },
  {
    id: "3",
    name: "Diagonal Lines",
    type: "lines",
    size: 1,
    spacing: 10,
    rotation: 45,
    opacity: 0.4,
    color: "#475569",
  },
  {
    id: "4",
    name: "Circles",
    type: "circles",
    size: 8,
    spacing: 24,
    rotation: 0,
    opacity: 0.3,
    color: "#6366f1",
  },
];

const getPatternIcon = (type: PatternType) => {
  switch (type) {
    case "dots":
      return Hash;
    case "grid":
      return Grid;
    case "lines":
      return Minus;
    case "circles":
      return Circle;
    case "squares":
      return Square;
    case "triangles":
      return Triangle;
    case "diamonds":
      return Diamond;
    default:
      return Square;
  }
};

const Icon = ({ type, size, className, style }: any) => {
  const IconComponent = getPatternIcon(type);
  return <IconComponent size={size} className={className} style={style} />;
};

export default function PatternLibrary({
  value,
  patterns = defaultPatterns,
  onValueChange,
  onPatternsChange,
  minSize = 1,
  maxSize = 20,
  className,
  ...props
}: PatternLibraryProps) {
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>(
    value || patterns[0],
  );

  const handlePatternChange = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    onValueChange?.(pattern);
  };

  const handleSizeChange = (size: number) => {
    if (!selectedPattern) return;
    const updatedPattern = { ...selectedPattern, size };
    handlePatternChange(updatedPattern);
  };

  const handleSpacingChange = (spacing: number) => {
    if (!selectedPattern) return;
    const updatedPattern = { ...selectedPattern, spacing };
    handlePatternChange(updatedPattern);
  };

  const handleRotationChange = (rotation: number) => {
    if (!selectedPattern) return;
    const updatedPattern = { ...selectedPattern, rotation };
    handlePatternChange(updatedPattern);
  };

  const handleOpacityChange = (opacity: number) => {
    if (!selectedPattern) return;
    const updatedPattern = { ...selectedPattern, opacity };
    handlePatternChange(updatedPattern);
  };

  const handleDeletePattern = (patternId: string) => {
    const updatedPatterns = patterns.filter((p) => p.id !== patternId);
    onPatternsChange?.(updatedPatterns);
  };

  const handleDuplicatePattern = (pattern: Pattern) => {
    const newPattern = {
      ...pattern,
      id: Math.random().toString(36).substr(2, 9),
      name: `${pattern.name} Copy`,
    };
    const updatedPatterns = [...patterns, newPattern];
    onPatternsChange?.(updatedPatterns);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "dark:border-white/10 dark:bg-black/90 dark:supports-[backdrop-filter]:bg-black/80",
        "transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {/* Pattern Preview */}
      {selectedPattern && (
        <div className="flex items-center justify-between border-b pb-4 dark:border-white/10 dark:bg-black">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white dark:border-white/10 dark:bg-white/5"
              style={{ backgroundColor: selectedPattern.color }}
            >
              <Icon
                type={selectedPattern.type}
                size={24}
                className={cn(
                  "text-foreground transition-all duration-200 dark:text-white",
                  selectedPattern.color && "fill-current",
                )}
                style={{
                  color: selectedPattern.color,
                }}
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground/90 dark:text-white/90">
                {selectedPattern.name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/50">
                {selectedPattern.type.charAt(0).toUpperCase() +
                  selectedPattern.type.slice(1)}{" "}
                Pattern
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleDuplicatePattern(selectedPattern)}
              className={cn(
                "rounded-md p-2 text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white",
                "transition-colors",
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeletePattern(selectedPattern.id)}
              className={cn(
                "rounded-md p-2 text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white",
                "transition-colors",
              )}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Pattern Type Selection */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
          Pattern Type
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            "dots",
            "grid",
            "lines",
            "circles",
            "squares",
            "triangles",
            "diamonds",
          ].map((type) => (
            <button
              key={type}
              onClick={() =>
                handlePatternChange({
                  ...selectedPattern!,
                  type: type as Pattern["type"],
                })
              }
              className={cn(
                "flex items-center justify-center gap-2 rounded-md p-2",
                "bg-muted hover:bg-muted/80 dark:bg-white/10 dark:hover:bg-white/20",
                "text-sm font-medium text-foreground/90 dark:text-white/90",
                "transition-colors",
                selectedPattern?.type === type &&
                  "bg-primary/20 dark:bg-white/20",
              )}
            >
              <Icon type={type as Pattern["type"]} size={16} />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Color */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
          Pattern Color
        </span>
        <div className="grid grid-cols-6 gap-2">
          {[
            "#6366f1",
            "#f43f5e",
            "#10b981",
            "#f59e0b",
            "#64748b",
            "#000000",
          ].map((color) => (
            <button
              key={color}
              onClick={() =>
                handlePatternChange({
                  ...selectedPattern!,
                  color,
                })
              }
              className={cn(
                "h-8 w-8 rounded-full border-2",
                selectedPattern?.color === color
                  ? "border-primary dark:border-white"
                  : "border-transparent",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Pattern Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
              Size
            </span>
            <span className="text-sm text-muted-foreground dark:text-white/50">
              {selectedPattern?.size}px
            </span>
          </div>
          <input
            type="range"
            min={minSize}
            max={maxSize}
            value={selectedPattern?.size || minSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted dark:bg-white/10",
              "range-slider:h-2 range-slider:rounded-full range-slider:bg-primary dark:range-slider:bg-white/90",
              "range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full range-thumb:border-2 range-thumb:border-primary",
              "range-thumb:bg-background dark:range-thumb:border-white dark:range-thumb:bg-black",
              "transition-colors",
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
              Spacing
            </span>
            <span className="text-sm text-muted-foreground dark:text-white/50">
              {selectedPattern?.spacing}px
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={48}
            value={selectedPattern?.spacing || 20}
            onChange={(e) => handleSpacingChange(Number(e.target.value))}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted dark:bg-white/10",
              "range-slider:h-2 range-slider:rounded-full range-slider:bg-primary dark:range-slider:bg-white/90",
              "range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full range-thumb:border-2 range-thumb:border-primary",
              "range-thumb:bg-background dark:range-thumb:border-white dark:range-thumb:bg-black",
              "transition-colors",
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
              Rotation
            </span>
            <span className="text-sm text-muted-foreground dark:text-white/50">
              {selectedPattern?.rotation}°
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={selectedPattern?.rotation || 0}
            onChange={(e) => handleRotationChange(Number(e.target.value))}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted dark:bg-white/10",
              "range-slider:h-2 range-slider:rounded-full range-slider:bg-primary dark:range-slider:bg-white/90",
              "range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full range-thumb:border-2 range-thumb:border-primary",
              "range-thumb:bg-background dark:range-thumb:border-white dark:range-thumb:bg-black",
              "transition-colors",
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
              Opacity
            </span>
            <span className="text-sm text-muted-foreground dark:text-white/50">
              {selectedPattern?.opacity &&
                Math.round(selectedPattern?.opacity * 100)}
              %
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={selectedPattern?.opacity}
            onChange={(e) =>
              handlePatternChange({
                ...selectedPattern!,
                opacity: parseFloat(e.target.value),
              })
            }
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted dark:bg-white/10",
              "range-slider:h-2 range-slider:rounded-full range-slider:bg-primary dark:range-slider:bg-white/90",
              "range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full range-thumb:border-2 range-thumb:border-primary",
              "range-thumb:bg-background dark:range-thumb:border-white dark:range-thumb:bg-black",
              "transition-colors",
            )}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={() =>
            handlePatternChange({
              ...selectedPattern!,
              size: 4,
              spacing: 20,
              rotation: 0,
              opacity: 0.5,
            })
          }
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md p-2",
            "bg-muted hover:bg-muted/80 dark:bg-white/10 dark:hover:bg-white/20",
            "text-sm font-medium text-foreground/90 dark:text-white/90",
            "transition-colors",
          )}
        >
          <RefreshCw className="h-4 w-4" />
          Reset Settings
        </button>
      </div>

      {/* Pattern Library */}
      <div className="space-y-2 border-t pt-4 dark:border-white/10">
        <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
          Pattern Library
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => handlePatternChange(pattern)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-3",
                "hover:bg-muted/50 dark:hover:bg-white/5",
                "transition-colors",
                selectedPattern?.id === pattern.id &&
                  "border-primary bg-primary/10 dark:border-white/20 dark:bg-white/10",
              )}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md border bg-white dark:border-white/10 dark:bg-white/5"
                style={{ backgroundColor: pattern.color }}
              >
                <Icon
                  type={pattern.type}
                  size={20}
                  className={cn(
                    "text-foreground transition-all duration-200 dark:text-white",
                    pattern.color && "fill-current",
                  )}
                  style={{
                    color: pattern.color,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground dark:text-white/50">
                {pattern.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
