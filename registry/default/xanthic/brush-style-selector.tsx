"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Paintbrush,
  Circle,
  Square,
  Star,
  Minus,
  Plus,
  Droplet,
  Settings2,
  RefreshCw,
} from "lucide-react";

export type BrushStyle = "round" | "square" | "star" | "custom";
export type BrushPreset = {
  id: string;
  name: string;
  size: number;
  opacity: number;
  style: BrushStyle;
  color?: string;
  hardness?: number;
  angle?: number;
  spacing?: number;
};

export interface BrushStyleSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: BrushPreset;
  presets?: BrushPreset[];
  onValueChange?: (value: BrushPreset) => void;
  minSize?: number;
  maxSize?: number;
  showAdvancedControls?: boolean;
}

export default function BrushStyleSelector({
  value,
  presets = [],
  onValueChange,
  minSize = 1,
  maxSize = 100,
  className,
  showAdvancedControls = false,
  ...props
}: BrushStyleSelectorProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [hardness, setHardness] = useState(value.hardness ?? 100);
  const [angle, setAngle] = useState(value.angle ?? 0);
  const [spacing, setSpacing] = useState(value.spacing ?? 1);

  const getBrushIcon = (style: BrushStyle) => {
    switch (style) {
      case "round":
        return Circle;
      case "square":
        return Square;
      case "star":
        return Star;
      default:
        return Paintbrush;
    }
  };

  const handleSizeChange = (newSize: number) => {
    if (onValueChange && newSize >= minSize && newSize <= maxSize) {
      onValueChange({ ...value, size: newSize });
    }
  };

  const handleOpacityChange = (newOpacity: number) => {
    if (onValueChange && newOpacity >= 0 && newOpacity <= 1) {
      onValueChange({ ...value, opacity: newOpacity });
    }
  };

  const handleHardnessChange = (newHardness: number) => {
    setHardness(newHardness);
    onValueChange?.({ ...value, hardness: newHardness });
  };

  const handleAngleChange = (newAngle: number) => {
    setAngle(newAngle);
    onValueChange?.({ ...value, angle: newAngle });
  };

  const handleSpacingChange = (newSpacing: number) => {
    setSpacing(newSpacing);
    onValueChange?.({ ...value, spacing: newSpacing });
  };

  const resetAdvancedSettings = () => {
    handleHardnessChange(100);
    handleAngleChange(0);
    handleSpacingChange(1);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {React.createElement(getBrushIcon(value.style), {
              size: Math.min(40, value.size + 15),
              className: cn(
                "text-foreground transition-all duration-200 dark:text-white",
                value.color && "fill-current",
              ),
              style: value.color ? { color: value.color } : undefined,
            })}
            {value.hardness && value.hardness < 100 && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-background/20" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{value.name}</span>
            <span className="text-sm text-muted-foreground">
              {value.size}px • {Math.round(value.opacity * 100)}%
            </span>
          </div>
        </div>
        {showAdvancedControls && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 rounded-md p-1.5 text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSettings && showAdvancedControls && (
        <div className="space-y-4 border-t pt-4 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
                Hardness
              </span>
              <span className="text-sm text-muted-foreground dark:text-white/50">
                {hardness}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={hardness}
              onChange={(e) => handleHardnessChange(Number(e.target.value))}
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
                Angle
              </span>
              <span className="text-sm text-muted-foreground dark:text-white/50">
                {angle}°
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => handleAngleChange(Number(e.target.value))}
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
                {spacing}x
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              value={spacing}
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

          <button
            onClick={resetAdvancedSettings}
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
      )}

      {/* Size and Opacity Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
              Size
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleSizeChange(Math.max(minSize, value.size - 1))
                }
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md",
                  "bg-muted hover:bg-muted/80 dark:bg-white/10 dark:hover:bg-white/20",
                  "transition-colors",
                )}
                disabled={value.size <= minSize}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-[2.5rem] text-center text-sm text-muted-foreground dark:text-white/50">
                {value.size}px
              </span>
              <button
                onClick={() =>
                  handleSizeChange(Math.min(maxSize, value.size + 1))
                }
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md",
                  "bg-muted hover:bg-muted/80 dark:bg-white/10 dark:hover:bg-white/20",
                  "transition-colors",
                )}
                disabled={value.size >= maxSize}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <input
            type="range"
            min={minSize}
            max={maxSize}
            value={value.size}
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
              Opacity
            </span>
            <span className="text-sm text-muted-foreground dark:text-white/50">
              {Math.round(value.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value.opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted dark:bg-white/10",
              "range-slider:h-2 range-slider:rounded-full range-slider:bg-primary dark:range-slider:bg-white/90",
              "range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full range-thumb:border-2 range-thumb:border-primary",
              "range-thumb:bg-background dark:range-thumb:border-white dark:range-thumb:bg-black",
              "transition-colors",
            )}
          />
        </div>
      </div>

      {/* Presets */}
      {presets.length > 0 && (
        <div className="space-y-2 border-t pt-4 dark:border-white/10">
          <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
            Presets
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onValueChange?.(preset)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-3",
                  "hover:bg-muted/50 dark:hover:bg-white/5",
                  "transition-colors",
                  value.id === preset.id &&
                    "border-primary bg-primary/10 dark:border-white/20 dark:bg-white/10",
                )}
              >
                <div className="relative">
                  {React.createElement(getBrushIcon(preset.style), {
                    size: Math.min(24, preset.size + 10),
                    className: cn(
                      "text-foreground transition-all duration-200 dark:text-white",
                      preset.color && "fill-current",
                    ),
                    style: preset.color ? { color: preset.color } : undefined,
                  })}
                  {preset.hardness && preset.hardness < 100 && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-background/20 dark:to-white/20" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground dark:text-white/50">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
