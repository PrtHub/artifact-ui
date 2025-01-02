import React from "react";
import { cn } from "@/lib/utils";

export interface GridPatternBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  gridType?: "dots" | "lines";
  gridSize?: number;
  opacity?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export default function GridPatternBackground({
  gridType = "dots",
  gridSize = 20,
  opacity = 0.2,
  color = "currentColor",
  animate = false,
  className,
  ...props
}: GridPatternBackgroundProps) {
  const patternId = React.useId();

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={gridSize}
            height={gridSize}
            className={cn(
              animate && [
                gridType === "dots"
                  ? "animate-[dots-shift_20s_linear_infinite]"
                  : "animate-[lines-shift_20s_linear_infinite]",
                "origin-center",
              ],
            )}
          >
            {gridType === "dots" ? (
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r={1}
                fill={color}
                fillOpacity={opacity}
              />
            ) : (
              <>
                <line
                  x1="0"
                  y1={gridSize / 2}
                  x2={gridSize}
                  y2={gridSize / 2}
                  stroke={color}
                  strokeOpacity={opacity}
                  strokeWidth="0.5"
                  className="origin-center"
                />
                <line
                  x1={gridSize / 2}
                  y1="0"
                  x2={gridSize / 2}
                  y2={gridSize}
                  stroke={color}
                  strokeOpacity={opacity}
                  strokeWidth="0.5"
                  className="origin-center"
                />
              </>
            )}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}
