"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

interface TextureBlendTransitionsProps {
  isActive?: boolean;
  texture?: "watercolor" | "paint" | "paper";
  duration?: number;
  children: React.ReactNode;
  onTransitionComplete?: () => void;
  intensity?: number;
  colorScheme?: {
    light: string;
    dark: string;
  };
  blendMode?: "normal" | "multiply" | "screen" | "overlay";
  customFilter?: string;
}

const textures = {
  watercolor: {
    filter: (intensity: number, colorScheme: string) =>
      `url(#watercolorEffect) drop-shadow(0 4px 8px ${colorScheme})`,
    transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  paint: {
    filter: (intensity: number, colorScheme: string) =>
      `url(#paintEffect) drop-shadow(0 4px 8px ${colorScheme})`,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
  },
  paper: {
    filter: (intensity: number, colorScheme: string) =>
      `url(#paperEffect) drop-shadow(0 4px 8px ${colorScheme})`,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function TextureBlendTransitions({
  isActive = false,
  texture = "watercolor",
  duration = 1,
  children,
  onTransitionComplete,
  intensity = 1,
  colorScheme = {
    light: "rgba(0, 0, 0, 0.1)",
    dark: "rgba(255, 255, 255, 0.1)",
  },
  blendMode = "normal",
  customFilter,
}: TextureBlendTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const currentColorScheme =
    theme === "dark" ? colorScheme.dark : colorScheme.light;

  useEffect(() => {
    if (isActive && onTransitionComplete) {
      const timer = setTimeout(onTransitionComplete, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onTransitionComplete]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="watercolorEffect">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.01 * intensity}
              numOctaves="3"
              seed={Math.random() * 100}
            />
            <feDisplacementMap in="SourceGraphic" scale={30 * intensity} />
            <feGaussianBlur stdDeviation={2 * intensity} />
            <feBlend mode={blendMode} />
          </filter>

          <filter id="paintEffect">
            <feTurbulence
              type="turbulence"
              baseFrequency={0.02 * intensity}
              numOctaves="2"
              seed={Math.random() * 100}
            />
            <feDisplacementMap in="SourceGraphic" scale={20 * intensity} />
            <feColorMatrix type="saturate" values={`${1.5 * intensity}`} />
            <feBlend mode={blendMode} />
          </filter>

          <filter id="paperEffect">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.04 * intensity}
              seed={Math.random() * 100}
            />
            <feDisplacementMap in="SourceGraphic" scale={10 * intensity} />
            <feBlend mode={blendMode} />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={isActive ? "active" : "inactive"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            filter:
              customFilter ||
              textures[texture].filter(intensity, currentColorScheme),
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            ...textures[texture].transition,
            duration,
          }}
          className="h-full w-full"
          style={{ mixBlendMode: blendMode }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
