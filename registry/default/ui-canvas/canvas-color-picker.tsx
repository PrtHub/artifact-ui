"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Paintbrush, Droplet, Palette } from "lucide-react";

type CanvasColorPickerProps = {
  value?: string;
  defaultValue?: string;
  defaultConsistency?: "thin" | "medium" | "thick";
  previewSize?: "sm" | "md" | "lg";
  showBrushPreview?: boolean;
  onChange?: (color: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

interface ColorMix {
  color: string;
  amount: number;
  consistency: "thin" | "medium" | "thick";
}

const previewSizes = {
  sm: "h-24",
  md: "h-32",
  lg: "h-40",
};

const consistencyStyles = {
  thin: {
    lineWidth: 2,
    opacity: 0.3,
    label: "Light",
  },
  medium: {
    lineWidth: 4,
    opacity: 0.6,
    label: "Medium",
  },
  thick: {
    lineWidth: 8,
    opacity: 0.9,
    label: "Heavy",
  },
};

export function CanvasColorPicker({
  value,
  defaultValue = "#000000",
  defaultConsistency = "medium",
  previewSize = "md",
  showBrushPreview = true,
  onChange,
  className,
  ...props
}: CanvasColorPickerProps) {
  const [currentColor, setCurrentColor] = React.useState(value || defaultValue);
  const [consistency, setConsistency] = React.useState(defaultConsistency);
  const [mixedColors, setMixedColors] = React.useState<
    Array<{ color: string; amount: number; consistency: typeof consistency }>
  >([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [points, setPoints] = React.useState<
    Array<{ x: number; y: number; pressure: number }>
  >([]);

  const updateBrushPreview = React.useCallback(() => {
    if (!canvasRef.current || !showBrushPreview) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length < 2) return;

    // Draw the brush stroke
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = consistencyStyles[consistency].lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = consistencyStyles[consistency].opacity;

    // Create smooth curve through points
    for (let i = 1; i < points.length - 2; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    // Draw the stroke
    ctx.stroke();
    ctx.globalAlpha = 1;
  }, [currentColor, consistency, points, showBrushPreview]);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setPoints([{ x: coords.x, y: coords.y, pressure: 1 }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoordinates(e);
    setPoints((prev) => [...prev, { x: coords.x, y: coords.y, pressure: 1 }]);
    updateBrushPreview();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setPoints([]);
  };

  const mixColors = React.useCallback(
    (color1: string, color2: string, ratio: number) => {
      // Convert hex to RGB
      const rgb1 = parseInt(color1.slice(1), 16);
      const rgb2 = parseInt(color2.slice(1), 16);

      const r1 = (rgb1 >> 16) & 255;
      const g1 = (rgb1 >> 8) & 255;
      const b1 = rgb1 & 255;

      const r2 = (rgb2 >> 16) & 255;
      const g2 = (rgb2 >> 8) & 255;
      const b2 = rgb2 & 255;

      // Mix the colors
      const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
      const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
      const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

      // Convert back to hex
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    },
    [],
  );

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    onChange?.(color);
    updateBrushPreview();
  };

  const handleColorMix = (newColor: string, amount: number) => {
    const mixed = mixColors(currentColor, newColor, amount);
    handleColorChange(mixed);
    setMixedColors([...mixedColors, { color: newColor, amount, consistency }]);
  };

  React.useEffect(() => {
    if (value) {
      setCurrentColor(value);
    }
  }, [value]);

  React.useEffect(() => {
    updateBrushPreview();
  }, [currentColor, consistency, updateBrushPreview]);

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-gradient-to-b from-background to-muted/50 p-6 shadow-lg backdrop-blur-sm dark:border-border",
        className,
      )}
      {...props}
    >
      {/* Color Input */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-12 w-full cursor-pointer rounded-lg border-2 border-input bg-transparent p-1 transition-all hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20 dark:border-border"
          />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {currentColor.toUpperCase()}
        </div>
      </div>

      {/* Paint Consistency Control */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-foreground dark:text-foreground/90">
          Paint Consistency
        </label>
        <div className="flex gap-3">
          {(["thin", "medium", "thick"] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setConsistency(c);
                setMixedColors([]);
              }}
              className={cn(
                "group flex flex-1 items-center justify-center gap-1 rounded-lg border border-input bg-background px-1 py-2 text-sm transition-all hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-background/50",
                consistency === c &&
                  "border-primary bg-primary/10 dark:bg-primary/20",
              )}
            >
              <Droplet
                className={cn(
                  "h-4 w-4 transition-colors",
                  consistency === c
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary/70",
                )}
                style={{
                  opacity: consistencyStyles[c].opacity,
                }}
              />
              <span
                className={cn(
                  "text-xs transition-colors",
                  consistency === c
                    ? "font-medium text-primary"
                    : "text-muted-foreground group-hover:text-primary/90",
                )}
              >
                {consistencyStyles[c].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Preview */}
      <div className="space-y-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border border-input bg-[url('/grid.svg')] shadow-inner transition-all dark:border-border",
            previewSizes[previewSize],
          )}
        >
          <div
            className="h-full w-full transition-opacity duration-200"
            style={{
              backgroundColor: currentColor,
              opacity: consistencyStyles[consistency].opacity,
            }}
          />
          {showBrushPreview && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          )}
        </div>
      </div>

      {/* Recent Mixes */}
      {mixedColors.length > 0 && (
        <div className="mt-6">
          <label className="mb-3 block text-sm font-medium text-foreground dark:text-foreground/90">
            Recent Mixes
          </label>
          <div className="flex flex-wrap gap-2">
            {mixedColors.slice(-5).map((mix, i) => (
              <button
                key={i}
                onClick={() => handleColorChange(mix.color)}
                className="group relative h-8 w-8 overflow-hidden rounded-full border border-input shadow-sm transition-transform hover:scale-110 dark:border-border"
                style={{
                  backgroundColor: mix.color,
                  opacity: consistencyStyles[mix.consistency].opacity,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
