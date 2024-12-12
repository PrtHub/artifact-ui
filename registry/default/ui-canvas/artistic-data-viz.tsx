"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Pause,
  Play,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

export interface DataPoint {
  id: string;
  value: number;
  label: string;
  color?: string;
  category?: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

interface DataPointWithPosition extends DataPoint {
  x: number;
  y: number;
}

export interface ArtisticDataVizProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  colorPalette?: string[];
  animated?: boolean;
  style?:
    | "wave"
    | "circle"
    | "spiral"
    | "bloom"
    | "bar"
    | "line"
    | "scatter"
    | "area";
  className?: string;
  onDataPointClick?: (point: DataPoint) => void;
  onShare?: (imageData: string) => void;
  onDownload?: (imageData: string) => void;
}

export default function ArtisticDataViz({
  data,
  width = 600,
  height = 400,
  colorPalette = [],
  animated = true,
  style = "wave",
  className,
  onDataPointClick,
  onShare,
  onDownload,
}: ArtisticDataVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedStyle, setSelectedStyle] = useState(style);
  const [hoveredPoint, setHoveredPoint] =
    useState<DataPointWithPosition | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMetadata, setShowMetadata] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [valueThreshold, setValueThreshold] = useState<number>(0);
  const [showGrid, setShowGrid] = useState(false);
  const [smoothing, setSmoothing] = useState(0.5);
  const { theme } = useTheme();

  // Default theme-aware color palettes
  const defaultLightPalette = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
  ];
  const defaultDarkPalette = [
    "#FF8585",
    "#6FFFE9",
    "#5CC9FF",
    "#B4EBC7",
    "#FFE5B4",
  ];

  const effectiveColorPalette =
    colorPalette.length > 0
      ? colorPalette
      : theme === "dark"
        ? defaultDarkPalette
        : defaultLightPalette;

  const filteredData = data.filter(
    (point) =>
      (!categoryFilter || point.category === categoryFilter) &&
      point.value >= valueThreshold,
  );

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

  const handleShare = () => {
    if (!canvasRef.current || !onShare) return;
    onShare(canvasRef.current.toDataURL());
  };

  const handleDownload = () => {
    if (!canvasRef.current || !onDownload) return;
    onDownload(canvasRef.current.toDataURL());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr * zoomLevel;
    canvas.height = height * dpr * zoomLevel;
    ctx.scale(dpr * zoomLevel, dpr * zoomLevel);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Theme-aware background and grid colors
    const backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
    const gridColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (showGrid) {
      drawGrid(ctx, width, height, gridColor);
    }

    const drawVisualization = () => {
      ctx.clearRect(0, 0, width, height);

      if (showGrid) {
        drawGrid(ctx, width, height, gridColor);
      }

      switch (selectedStyle) {
        case "wave":
          drawWave(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "circle":
          drawCircle(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "spiral":
          drawSpiral(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "bloom":
          drawBloom(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "bar":
          drawBar(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "line":
          drawLine(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "scatter":
          drawScatter(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
        case "area":
          drawArea(
            ctx,
            filteredData,
            width,
            height,
            effectiveColorPalette,
            animationSpeed,
            smoothing,
          );
          break;
      }
    };

    if (!isPaused && animated) {
      let animationFrame: number;
      const animate = () => {
        drawVisualization();
        animationFrame = requestAnimationFrame(animate);
      };
      animate();

      return () => cancelAnimationFrame(animationFrame);
    } else {
      drawVisualization();
    }
  }, [
    filteredData,
    width,
    height,
    selectedStyle,
    effectiveColorPalette,
    animated,
    isPaused,
    zoomLevel,
    showGrid,
    animationSpeed,
    smoothing,
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onDataPointClick) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const closestPoint = findClosestDataPoint(
      x,
      y,
      filteredData,
      width,
      height,
    );
    if (closestPoint) {
      onDataPointClick(closestPoint);
      setHoveredPoint({ ...closestPoint, x, y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const point = findClosestDataPoint(x, y, filteredData, width, height);
    if (point) {
      setHoveredPoint({ ...point, x, y });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className={cn("relative rounded-lg bg-background p-4", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Select
              value={selectedStyle}
              onValueChange={(
                value:
                  | "wave"
                  | "circle"
                  | "spiral"
                  | "bloom"
                  | "bar"
                  | "line"
                  | "scatter"
                  | "area",
              ) => setSelectedStyle(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="spiral">Spiral</SelectItem>
                <SelectItem value="bloom">Bloom</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="scatter">Scatter</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPaused(!isPaused)}
                  >
                    {isPaused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPaused ? "Resume Animation" : "Pause Animation"}
                </TooltipContent>
              </Tooltip>
              {onShare && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
              )}
              {onDownload && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden rounded-lg border bg-background/50 p-4 backdrop-blur-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animation Speed</label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={([value]) => setAnimationSpeed(value)}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Smoothing</label>
                  <Slider
                    value={[smoothing]}
                    onValueChange={([value]) => setSmoothing(value)}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Grid</label>
                  <Switch checked={showGrid} onCheckedChange={setShowGrid} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Metadata</label>
                  <Switch
                    checked={showMetadata}
                    onCheckedChange={setShowMetadata}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Value Threshold</label>
                <Input
                  type="number"
                  value={valueThreshold}
                  onChange={(e) => setValueThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            className="rounded-lg shadow-lg"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              cursor: onDataPointClick ? "pointer" : "default",
            }}
          />
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute rounded-lg bg-white/90 p-2 shadow-lg backdrop-blur-sm"
                style={{
                  left: `${hoveredPoint.x}px`,
                  top: `${hoveredPoint.y - 40}px`,
                }}
              >
                <p className="text-sm font-medium">{hoveredPoint.label}</p>
                <p className="text-xs text-gray-500">{hoveredPoint.value}</p>
                {showMetadata && hoveredPoint.metadata && (
                  <div className="mt-1 space-y-1">
                    {Object.entries(hoveredPoint.metadata).map(
                      ([key, value]) => (
                        <p key={key} className="text-xs text-gray-400">
                          {key}: {value}
                        </p>
                      ),
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Drawing functions
function drawWave(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const points = data.length;
  const amplitude = height / 3;
  const frequency = (2 * Math.PI) / points;

  data.forEach((point, i) => {
    const x = (width * i) / (points - 1);
    const normalizedValue = point.value / Math.max(...data.map((d) => d.value));
    const y =
      height / 2 +
      amplitude *
        Math.sin(frequency * i + (performance.now() / 1000) * animationSpeed) *
        normalizedValue;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();

    if (i > 0) {
      const prevPoint = data[i - 1];
      const prevX = (width * (i - 1)) / (points - 1);
      const prevNormalizedValue =
        prevPoint.value / Math.max(...data.map((d) => d.value));
      const prevY =
        height / 2 +
        amplitude *
          Math.sin(
            frequency * (i - 1) + (performance.now() / 1000) * animationSpeed,
          ) *
          prevNormalizedValue;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = point.color || colorPalette[i % colorPalette.length];
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;

  data.forEach((point, i) => {
    const angle = (i * 2 * Math.PI) / data.length;
    const normalizedValue = point.value / Math.max(...data.map((d) => d.value));
    const x = centerX + radius * Math.cos(angle) * normalizedValue;
    const y = centerY + radius * Math.sin(angle) * normalizedValue;

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();

    if (i > 0) {
      const prevPoint = data[i - 1];
      const prevAngle = ((i - 1) * 2 * Math.PI) / data.length;
      const prevNormalizedValue =
        prevPoint.value / Math.max(...data.map((d) => d.value));
      const prevX =
        centerX + radius * Math.cos(prevAngle) * prevNormalizedValue;
      const prevY =
        centerY + radius * Math.sin(prevAngle) * prevNormalizedValue;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = point.color || colorPalette[i % colorPalette.length];
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawSpiral(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 3;

  data.forEach((point, i) => {
    const angle = i * 0.5;
    const normalizedValue = point.value / Math.max(...data.map((d) => d.value));
    const radius = (maxRadius * i) / data.length;
    const x = centerX + radius * Math.cos(angle) * normalizedValue;
    const y = centerY + radius * Math.sin(angle) * normalizedValue;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();

    if (i > 0) {
      const prevPoint = data[i - 1];
      const prevAngle = (i - 1) * 0.5;
      const prevRadius = (maxRadius * (i - 1)) / data.length;
      const prevNormalizedValue =
        prevPoint.value / Math.max(...data.map((d) => d.value));
      const prevX =
        centerX + prevRadius * Math.cos(prevAngle) * prevNormalizedValue;
      const prevY =
        centerY + prevRadius * Math.sin(prevAngle) * prevNormalizedValue;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = point.color || colorPalette[i % colorPalette.length];
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawBloom(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 3;

  const time = performance.now() / 2000;

  data.forEach((point, i) => {
    const angle = (i * 2 * Math.PI) / data.length + time;
    const normalizedValue = point.value / Math.max(...data.map((d) => d.value));
    const radius = maxRadius * normalizedValue;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();

    // Draw petal
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.quadraticCurveTo(
      centerX + radius * Math.cos(angle - 0.2) * 0.5,
      centerY + radius * Math.sin(angle - 0.2) * 0.5,
      x,
      y,
    );
    ctx.quadraticCurveTo(
      centerX + radius * Math.cos(angle + 0.2) * 0.5,
      centerY + radius * Math.sin(angle + 0.2) * 0.5,
      centerX,
      centerY,
    );
    ctx.fillStyle = `${point.color || colorPalette[i % colorPalette.length]}44`;
    ctx.fill();
  });
}

function drawBar(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const padding = 40;
  const barWidth = (width - padding * 2) / data.length;
  const maxValue = Math.max(...data.map((d) => d.value));

  data.forEach((point, i) => {
    const normalizedValue = point.value / maxValue;
    const x = padding + i * barWidth;
    const barHeight = (height - padding * 2) * normalizedValue;
    const y = height - padding - barHeight;

    ctx.beginPath();
    ctx.rect(x, y, barWidth * 0.8, barHeight);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();

    // Add animation effect
    const time = performance.now() / 1000;
    const glowIntensity = Math.sin(time * animationSpeed + i) * 0.2 + 0.8;
    ctx.shadowColor = point.color || colorPalette[i % colorPalette.length];
    ctx.shadowBlur = 10 * glowIntensity;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const padding = 40;
  const maxValue = Math.max(...data.map((d) => d.value));

  ctx.beginPath();
  data.forEach((point, i) => {
    const normalizedValue = point.value / maxValue;
    const x = padding + (i * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - normalizedValue * (height - padding * 2);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      // Create smooth curves
      const prevPoint = data[i - 1];
      const prevX =
        padding + ((i - 1) * (width - padding * 2)) / (data.length - 1);
      const prevY =
        height -
        padding -
        (prevPoint.value / maxValue) * (height - padding * 2);

      const cp1x = prevX + (x - prevX) * smoothing;
      const cp1y = prevY;
      const cp2x = x - (x - prevX) * smoothing;
      const cp2y = y;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
  });

  // Animate line dash
  const time = performance.now() / 1000;
  ctx.setLineDash([5, 5]);
  ctx.lineDashOffset = -time * animationSpeed * 50;

  ctx.strokeStyle = colorPalette[0];
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw points
  data.forEach((point, i) => {
    const normalizedValue = point.value / maxValue;
    const x = padding + (i * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - normalizedValue * (height - padding * 2);

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];
    ctx.fill();
  });
}

function drawScatter(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const padding = 40;
  const maxValue = Math.max(...data.map((d) => d.value));

  const time = performance.now() / 1000;

  data.forEach((point, i) => {
    const normalizedValue = point.value / maxValue;
    const baseX = padding + (i * (width - padding * 2)) / (data.length - 1);
    const baseY = height - padding - normalizedValue * (height - padding * 2);

    // Add some animated scatter
    const scatterX = baseX + Math.sin(time * animationSpeed + i) * 10;
    const scatterY = baseY + Math.cos(time * animationSpeed + i) * 10;

    ctx.beginPath();
    ctx.arc(scatterX, scatterY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = point.color || colorPalette[i % colorPalette.length];

    // Add glow effect
    const glowIntensity = Math.sin(time * animationSpeed + i) * 0.3 + 0.7;
    ctx.shadowColor = point.color || colorPalette[i % colorPalette.length];
    ctx.shadowBlur = 15 * glowIntensity;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawArea(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  colorPalette: string[],
  animationSpeed: number,
  smoothing: number,
) {
  ctx.clearRect(0, 0, width, height);
  const padding = 40;
  const maxValue = Math.max(...data.map((d) => d.value));

  // Draw filled area
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);

  data.forEach((point, i) => {
    const normalizedValue = point.value / maxValue;
    const x = padding + (i * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - normalizedValue * (height - padding * 2);

    if (i === 0) {
      ctx.lineTo(x, y);
    } else {
      const prevPoint = data[i - 1];
      const prevX =
        padding + ((i - 1) * (width - padding * 2)) / (data.length - 1);
      const prevY =
        height -
        padding -
        (prevPoint.value / maxValue) * (height - padding * 2);

      const cp1x = prevX + (x - prevX) * smoothing;
      const cp1y = prevY;
      const cp2x = x - (x - prevX) * smoothing;
      const cp2y = y;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
  });

  // Complete the area by drawing to the bottom
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(padding, height - padding);

  // Create gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${colorPalette[0]}88`);
  gradient.addColorStop(1, `${colorPalette[0]}11`);

  ctx.fillStyle = gradient;
  ctx.fill();

  // Animate the area with a moving line
  const time = performance.now() / 1000;
  const lineY =
    height -
    padding -
    Math.abs(Math.sin(time * animationSpeed)) * (height - padding * 2);

  ctx.beginPath();
  ctx.moveTo(padding, lineY);
  ctx.lineTo(width - padding, lineY);
  ctx.strokeStyle = colorPalette[0];
  ctx.setLineDash([5, 5]);
  ctx.lineDashOffset = time * animationSpeed * 50;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridColor: string = "rgba(0, 0, 0, 0.1)",
) {
  const step = 20;
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function findClosestDataPoint(
  mouseX: number,
  mouseY: number,
  data: DataPoint[],
  width: number,
  height: number,
): DataPoint | null {
  let closest: DataPoint | null = null;
  let minDistance = Infinity;

  // Calculate the spacing between points
  const spacing = width / (data.length + 1);

  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((point) => point.value));

  data.forEach((point, index) => {
    // Calculate x based on index
    const pointX = spacing * (index + 1);
    // Calculate y based on value (inverted since canvas y grows downward)
    const pointY = height - (point.value / maxValue) * height;

    const dx = mouseX - pointX;
    const dy = mouseY - pointY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closest = point;
    }
  });

  return closest;
}
