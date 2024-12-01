"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BrushStrokeLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
  strokeStyle?: "paint" | "ink" | "watercolor";
  colorFlow?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BrushStrokeLoader({
  progress = 0,
  strokeStyle = "paint",
  colorFlow = true,
  size = "md",
  className,
  ...props
}: BrushStrokeLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sizes = {
    sm: { width: 120, height: 6 },
    md: { width: 200, height: 8 },
    lg: { width: 300, height: 12 },
  };

  const { width, height } = sizes[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up gradient for color flow
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    if (colorFlow) {
      gradient.addColorStop(0, "#FF6B6B");
      gradient.addColorStop(0.5, "#4ECDC4");
      gradient.addColorStop(1, "#45B7D1");
    } else {
      gradient.addColorStop(0, "#4ECDC4");
      gradient.addColorStop(1, "#4ECDC4");
    }

    ctx.strokeStyle = gradient;
    ctx.lineCap = "round";
    ctx.lineWidth = height;

    // Draw stroke based on style
    ctx.beginPath();
    switch (strokeStyle) {
      case "paint":
        ctx.setLineDash([]);
        break;
      case "ink":
        ctx.setLineDash([height * 2, height]);
        break;
      case "watercolor":
        ctx.setLineDash([height, height * 0.5]);
        break;
    }

    ctx.moveTo(0, height / 2);
    ctx.lineTo((width * progress) / 100, height / 2);
    ctx.stroke();
  }, [progress, strokeStyle, colorFlow, width, height]);

  return (
    <div className={cn("relative", className)} {...props}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-full"
      />
    </div>
  );
}
