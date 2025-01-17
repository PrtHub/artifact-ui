"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Flag,
  Clock,
  Save,
  Undo,
  Redo,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";

export interface TimelineStep {
  id: string;
  thumbnail: string;
  timestamp: Date;
  label: string;
  type: "brush" | "eraser" | "shape" | "text" | "layer" | "filter" | "snapshot";
  description?: string;
  duration?: number; // in seconds
  markers?: Array<{
    time: number; // position in seconds
    label: string;
    color?: string;
  }>;
}

interface CanvasTimelineProps {
  steps: TimelineStep[];
  currentStepIndex: number;
  onStepChange?: (index: number) => void;
  onSnapshot?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  className?: string;
  canUndo?: boolean;
  canRedo?: boolean;
}

export default function CanvasTimeline({
  steps,
  currentStepIndex,
  onStepChange,
  onSnapshot,
  onUndo,
  onRedo,
  onSave,
  className,
  canUndo = false,
  canRedo = false,
}: CanvasTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hiddenStepTypes, setHiddenStepTypes] = useState<
    Set<TimelineStep["type"]>
  >(new Set());
  const [zoom, setZoom] = useState(1);
  const [showTimestamps, setShowTimestamps] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleSteps = steps.filter((step) => !hiddenStepTypes.has(step.type));
  const totalDuration = visibleSteps.reduce(
    (acc, step) => acc + (step.duration || 0),
    0,
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentStepIndex > 0) {
          onStepChange?.(currentStepIndex - 1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentStepIndex < visibleSteps.length - 1) {
          onStepChange?.(currentStepIndex + 1);
        }
      } else if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          onRedo?.();
        } else {
          onUndo?.();
        }
      }
    },
    [currentStepIndex, visibleSteps.length, onStepChange, onUndo, onRedo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const toggleStepTypeVisibility = (type: TimelineStep["type"]) => {
    const newHidden = new Set(hiddenStepTypes);
    if (newHidden.has(type)) {
      newHidden.delete(type);
    } else {
      newHidden.add(type);
    }
    setHiddenStepTypes(newHidden);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentStepIndex === steps.length - 1) {
      onStepChange?.(0);
    }
  };

  const goToNextStep = () => {
    if (currentStepIndex < visibleSteps.length - 1) {
      onStepChange?.(currentStepIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      onStepChange?.(currentStepIndex - 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        goToNextStep();
      }, 1000 / playbackSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStepIndex, playbackSpeed]);

  const getStepTypeIcon = (type: TimelineStep["type"]) => {
    switch (type) {
      case "brush":
        return "🖌️";
      case "eraser":
        return "🧹";
      case "shape":
        return "⭕";
      case "text":
        return "📝";
      case "layer":
        return "📑";
      case "filter":
        return "🎨";
      case "snapshot":
        return "📸";
      default:
        return "•";
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(0.5, newZoom), 2);
    });
  };

  return (
    <TooltipProvider>
      <Card className={cn("p-4", className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="z-20 flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onStepChange?.(0)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset (Home)</TooltipContent>
              </Tooltip>

              <div className="flex items-center rounded-md border">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToPreviousStep}
                      disabled={currentStepIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Previous (←)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Play/Pause (Space)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToNextStep}
                      disabled={currentStepIndex === visibleSteps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next (→)</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onUndo}
                      disabled={!canUndo}
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onRedo}
                      disabled={!canRedo}
                    >
                      <Redo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="z-20 flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleZoom("out")}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="min-w-[3ch] text-center text-sm">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleZoom("in")}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onSnapshot}>
                    <Camera className="mr-2 h-4 w-4" />
                    Take Snapshot
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Timeline
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowTimestamps((p) => !p)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Toggle Timestamps
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2">
                <Slider
                  value={[playbackSpeed]}
                  min={0.25}
                  max={4}
                  step={0.25}
                  className="w-[100px]"
                  onValueChange={([value]) => setPlaybackSpeed(value)}
                />
                <span className="min-w-[3ch] text-sm text-muted-foreground">
                  {playbackSpeed}x
                </span>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[40px] whitespace-nowrap">
            <div className="flex gap-2">
              {Array.from(new Set(steps.map((step) => step.type))).map(
                (type) => (
                  <Tooltip key={type}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={
                          hiddenStepTypes.has(type) ? "ghost" : "secondary"
                        }
                        size="sm"
                        onClick={() => toggleStepTypeVisibility(type)}
                        className="gap-2"
                      >
                        {hiddenStepTypes.has(type) ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                        <span>{getStepTypeIcon(type)}</span>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle {type} visibility</TooltipContent>
                  </Tooltip>
                ),
              )}
            </div>
          </ScrollArea>

          <ScrollArea className="h-[120px]" ref={scrollRef}>
            <div className="flex gap-2" style={{ width: `${100 * zoom}%` }}>
              {visibleSteps.map((step, index) => (
                <Tooltip key={step.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onStepChange?.(index)}
                      className={cn(
                        "group relative h-[100px] w-[100px] overflow-hidden rounded-md border transition-all hover:border-primary",
                        index === currentStepIndex
                          ? "ring-2 ring-primary ring-offset-2"
                          : "border-muted",
                      )}
                    >
                      <Image
                        src={step.thumbnail}
                        alt={step.label}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {/* Markers */}
                      {step.markers?.map((marker, i) => (
                        <div
                          key={i}
                          className="absolute left-0 h-full w-1"
                          style={{
                            left: `${(marker.time / (step.duration || 1)) * 100}%`,
                            backgroundColor: marker.color || "var(--primary)",
                          }}
                        >
                          <Flag className="h-3 w-3" />
                        </div>
                      ))}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-background/0 p-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <span>{getStepTypeIcon(step.type)}</span>
                            <span className="text-xs font-medium">
                              {step.label}
                            </span>
                          </div>
                          {showTimestamps && (
                            <div className="text-[10px] text-muted-foreground">
                              {format(step.timestamp, "HH:mm:ss")}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <div className="font-medium">{step.label}</div>
                      {step.description && (
                        <div className="text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      )}
                      {step.duration && (
                        <div className="text-xs text-muted-foreground">
                          Duration: {step.duration}s
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="space-y-1">
            <Slider
              value={[currentStepIndex]}
              min={0}
              max={visibleSteps.length - 1}
              step={1}
              className="mt-2"
              onValueChange={([value]) => onStepChange?.(value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>
                {Math.floor(totalDuration / 60)}:
                {String(totalDuration % 60).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
