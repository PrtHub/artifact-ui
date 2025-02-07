import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightSize?: number;
  spotlightOpacity?: number;
  gradientColor?: string;
  glowEffect?: boolean;
  multiSpotlight?: boolean;
  spotlightBlur?: boolean;
  glowSize?: number;
  glowOpacity?: number;
  animated?: boolean;
}

export default function SpotlightCard({
  children,
  className,
  spotlightSize = 250,
  spotlightOpacity = 0.15,
  gradientColor = "rgb(168, 85, 247)",
  glowEffect = false,
  multiSpotlight = false,
  spotlightBlur = false,
  glowSize = 100,
  glowOpacity = 0.15,
  animated = false,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [secondaryPosition, setSecondaryPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (animated && isHovered) {
      const interval = setInterval(() => {
        setSecondaryPosition({
          x: Math.random() * (divRef.current?.offsetWidth || 0),
          y: Math.random() * (divRef.current?.offsetHeight || 0),
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [animated, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setPosition(newPosition);

    if (multiSpotlight) {
      setSecondaryPosition({
        x: div.offsetWidth - (e.clientX - rect.left),
        y: div.offsetHeight - (e.clientY - rect.top),
      });
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  const getSpotlightBackground = (
    pos: { x: number; y: number },
    size: number,
    blur = false,
  ) => {
    return `radial-gradient(${size}px ${blur ? "ellipse" : "circle"} at ${pos.x}px ${pos.y}px, 
      var(--spotlight-color) 0%, 
      transparent ${blur ? "75%" : "65%"})`;
  };

  return (
    <div
      ref={divRef}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background transition-transform duration-300",
        isHovered && "scale-[1.02]",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Main Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={
          {
            opacity,
            background: getSpotlightBackground(
              position,
              spotlightSize,
              spotlightBlur,
            ),
            ["--spotlight-color" as string]: `color-mix(in srgb, var(--gradient-color, ${gradientColor}), transparent ${(1 - spotlightOpacity) * 100}%)`,
          } as React.CSSProperties
        }
      />

      {/* Secondary Spotlight */}
      {multiSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={
            {
              opacity: opacity * 0.7,
              background: getSpotlightBackground(
                secondaryPosition,
                spotlightSize * 0.8,
                spotlightBlur,
              ),
              ["--spotlight-color" as string]: `color-mix(in srgb, var(--gradient-color, ${gradientColor}), transparent ${(1 - spotlightOpacity * 0.8) * 100}%)`,
            } as React.CSSProperties
          }
        />
      )}

      {/* Glow Effect */}
      {glowEffect && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 blur-xl transition-opacity duration-300"
          style={
            {
              opacity: opacity * glowOpacity,
              background: getSpotlightBackground(position, glowSize),
              ["--spotlight-color" as string]: `color-mix(in srgb, var(--gradient-color, ${gradientColor}), transparent 15%)`,
            } as React.CSSProperties
          }
        />
      )}

      {/* Light Mode Gradient */}
      <div
        className="absolute -inset-px transition-opacity duration-300 dark:opacity-0"
        style={{
          background:
            "linear-gradient(to right, transparent, rgb(255 255 255 / 0.1))",
        }}
      />

      {/* Dark Mode Gradient */}
      <div
        className="absolute -inset-px opacity-0 mix-blend-overlay transition-opacity duration-300 dark:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, rgb(0 0 0 / 0.05))",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
