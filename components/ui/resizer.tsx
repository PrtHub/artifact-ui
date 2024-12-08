"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ResizerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  showHandle?: boolean;
  handleSize?: number;
  handleClassName?: string;
  onResize?: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export const Resizer = React.forwardRef<HTMLDivElement, ResizerProps>(
  (
    {
      className,
      orientation = "vertical",
      showHandle = false,
      handleSize = 4,
      handleClassName,
      onResize,
      onResizeStart,
      onResizeEnd,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const startPosRef = React.useRef<number>(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      startPosRef.current = orientation === "vertical" ? e.clientX : e.clientY;
      onResizeStart?.();

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const currentPos = orientation === "vertical" ? e.clientX : e.clientY;
          const delta = currentPos - startPosRef.current;
          onResize?.(delta);
          startPosRef.current = currentPos;
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        onResizeEnd?.();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex touch-none select-none",
          orientation === "vertical"
            ? "h-full w-px cursor-col-resize"
            : "h-px w-full cursor-row-resize",
          isDragging && "bg-primary",
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {showHandle && (
          <div
            className={cn(
              "absolute bg-border transition-colors hover:bg-primary/50",
              orientation === "vertical"
                ? `left-1/2 h-16 -translate-x-1/2 rounded-sm`
                : `top-1/2 w-16 -translate-y-1/2 rounded-sm`,
              orientation === "vertical"
                ? `w-[${handleSize}px]`
                : `h-[${handleSize}px]`,
              handleClassName
            )}
          />
        )}
      </div>
    );
  }
);

Resizer.displayName = "Resizer";
