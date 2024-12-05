"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UnlockIcon,
  Trash2Icon,
  MoveUpIcon,
  MoveDownIcon,
  LayersIcon,
} from "lucide-react";
import Image from "next/image";

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  thumbnail?: string;
}

export interface LayerManagerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  layers: Layer[];
  selectedLayerId?: string;
  onLayerSelect?: (id: string) => void;
  onLayerVisibilityToggle?: (id: string) => void;
  onLayerLockToggle?: (id: string) => void;
  onLayerDelete?: (id: string) => void;
  onLayerMove?: (id: string, direction: "up" | "down") => void;
  onLayerRename?: (id: string, newName: string) => void;
}

export default function LayerManager({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerVisibilityToggle,
  onLayerLockToggle,
  onLayerDelete,
  onLayerMove,
  onLayerRename,
  className,
  ...props
}: LayerManagerProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "dark:bg-black/90 dark:supports-[backdrop-filter]:bg-black/80",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 dark:border-white/10">
        <LayersIcon className="h-4 w-4 text-foreground/70 dark:text-white/70" />
        <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
          Layers
        </span>
      </div>
      <div className="flex flex-col p-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all",
              "hover:bg-accent/5 dark:hover:bg-white/5",
              selectedLayerId === layer.id && "bg-accent/10 dark:bg-white/10",
            )}
            onClick={() => onLayerSelect?.(layer.id)}
          >
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              {layer.thumbnail ? (
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border/50 bg-muted/50 dark:border-white/10 dark:bg-white/5">
                  <Image
                    src={layer.thumbnail}
                    alt={layer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 dark:border-white/10 dark:bg-white/5">
                  <LayersIcon className="h-4 w-4 text-muted-foreground dark:text-white/50" />
                </div>
              )}

              <input
                type="text"
                value={layer.name}
                className="h-7 w-full rounded bg-transparent px-1 text-sm text-foreground/90 focus:outline-none focus:ring-1 focus:ring-ring dark:text-white/90 dark:focus:ring-white/20"
                onChange={(e) => onLayerRename?.(layer.id, e.target.value)}
              />
            </div>

            <div className="flex items-center gap-0.5">
              <button
                className={cn(
                  "rounded-md p-2 transition-colors",
                  "text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white",
                  !layer.visible &&
                    "text-muted-foreground/50 dark:text-white/25",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerVisibilityToggle?.(layer.id);
                }}
                title={layer.visible ? "Hide layer" : "Show layer"}
              >
                {layer.visible ? (
                  <EyeIcon className="h-3.5 w-3.5" />
                ) : (
                  <EyeOffIcon className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                className={cn(
                  "rounded-md p-2 transition-colors",
                  "text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white",
                  layer.locked && "text-foreground dark:text-white",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerLockToggle?.(layer.id);
                }}
                title={layer.locked ? "Unlock layer" : "Lock layer"}
              >
                {layer.locked ? (
                  <LockIcon className="h-3.5 w-3.5" />
                ) : (
                  <UnlockIcon className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground dark:text-white/50 dark:hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerMove?.(layer.id, "up");
                }}
                title="Move layer up"
              >
                <MoveUpIcon className="h-3.5 w-3.5" />
              </button>

              <button
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground dark:text-white/50 dark:hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerMove?.(layer.id, "down");
                }}
                title="Move layer down"
              >
                <MoveDownIcon className="h-3.5 w-3.5" />
              </button>

              <button
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-red-500 dark:text-white/50 dark:hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerDelete?.(layer.id);
                }}
                title="Delete layer"
              >
                <Trash2Icon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
