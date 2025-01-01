import React from "react";
import { cn } from "@/lib/utils";

export interface GradientMeshBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Primary color for the gradient
   * @default "#4f46e5"
   */
  primaryColor?: string;
  /**
   * Secondary color for the gradient
   * @default "#9333ea"
   */
  secondaryColor?: string;
  /**
   * Accent color for additional depth
   * @default "#ec4899"
   */
  accentColor?: string;
  /**
   * Animation speed in seconds
   * @default 20
   */
  animationSpeed?: number;
  /**
   * Blur intensity for the gradient
   * @default 100
   */
  blurIntensity?: number;
}

export function GradientMeshBackground({
  primaryColor = "#4f46e5",
  secondaryColor = "#9333ea",
  accentColor = "#ec4899",
  animationSpeed = 20,
  blurIntensity = 100,
  className,
  ...props
}: GradientMeshBackgroundProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(at 27% 37%, ${primaryColor} 0px, transparent 50%),
            radial-gradient(at 97% 21%, ${secondaryColor} 0px, transparent 50%),
            radial-gradient(at 52% 99%, ${accentColor} 0px, transparent 50%),
            radial-gradient(at 10% 29%, ${primaryColor} 0px, transparent 50%),
            radial-gradient(at 97% 96%, ${secondaryColor} 0px, transparent 50%),
            radial-gradient(at 33% 50%, ${accentColor} 0px, transparent 50%),
            radial-gradient(at 79% 53%, ${primaryColor} 0px, transparent 50%)
          `,
          filter: `blur(${blurIntensity}px)`,
          animation: `gradientAnimation ${animationSpeed}s ease infinite`,
        }}
      />
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.5) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
