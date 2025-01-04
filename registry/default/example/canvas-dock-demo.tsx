"use client";

import * as React from "react";
import { CanvasDock, CanvasDockItem } from "@/registry/default/ui/canvas-dock";
import { Button } from "@/components/ui/button";

export default function CanvasDockDemo() {
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [variant, setVariant] = React.useState<
    | "wooden"
    | "metallic"
    | "modern"
    | "glass"
    | "neon"
    | "chalk"
    | "paper"
    | "canvas"
  >("wooden");

  return (
    <div className="relative z-50 min-h-[400px] w-full">
      <div className="absolute right-4 top-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("wooden")}
          className={variant === "wooden" ? "border-primary" : ""}
        >
          Wooden
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("metallic")}
          className={variant === "metallic" ? "border-primary" : ""}
        >
          Metallic
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("modern")}
          className={variant === "modern" ? "border-primary" : ""}
        >
          Modern
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("glass")}
          className={variant === "glass" ? "border-primary" : ""}
        >
          Glass
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("neon")}
          className={variant === "neon" ? "border-primary" : ""}
        >
          Neon
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("chalk")}
          className={variant === "chalk" ? "border-primary" : ""}
        >
          Chalk
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("paper")}
          className={variant === "paper" ? "border-primary" : ""}
        >
          Paper
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVariant("canvas")}
          className={variant === "canvas" ? "border-primary" : ""}
        >
          Canvas
        </Button>
      </div>

      <CanvasDock
        variant={variant}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <CanvasDockItem
          variant="brush"
          selected={selectedTool === "brush"}
          onClick={() => setSelectedTool("brush")}
          label="Brush"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
            <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
            <path d="M14.5 17.5 4.5 15" />
          </svg>
        </CanvasDockItem>

        <CanvasDockItem
          variant="pencil"
          selected={selectedTool === "pencil"}
          onClick={() => setSelectedTool("pencil")}
          label="Pencil"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="2" x2="22" y2="6" />
            <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z" />
          </svg>
        </CanvasDockItem>

        <CanvasDockItem
          variant="palette"
          selected={selectedTool === "palette"}
          onClick={() => setSelectedTool("palette")}
          label="Palette"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" />
            <circle cx="17.5" cy="10.5" r=".5" />
            <circle cx="8.5" cy="7.5" r=".5" />
            <circle cx="6.5" cy="12.5" r=".5" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        </CanvasDockItem>

        <CanvasDockItem
          variant="tool"
          selected={selectedTool === "eraser"}
          onClick={() => setSelectedTool("eraser")}
          label="Eraser"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
            <path d="M22 21H7" />
            <path d="m5 11 9 9" />
          </svg>
        </CanvasDockItem>
      </CanvasDock>
    </div>
  );
}
