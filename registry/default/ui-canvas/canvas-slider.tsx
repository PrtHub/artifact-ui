"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface CanvasSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  variant?:
    | "default"
    | "watercolor"
    | "neon"
    | "glass"
    | "metallic"
    | "gradient";
}

const defaultColors = {
  light: {
    default: {
      primary: "#000000",
      secondary: "#666666",
    },
    neon: {
      primary: "#FF0080",
      secondary: "#7928CA",
    },
    glass: {
      primary: "#0EA5E9",
      secondary: "#6366F1",
    },
    metallic: {
      primary: "#94A3B8",
      secondary: "#E2E8F0",
    },
    gradient: {
      primary: "#F97316",
      secondary: "#FBBF24",
    },
    watercolor: {
      primary: "#4F46E5",
      secondary: "#06B6D4",
    },
  },
  dark: {
    default: {
      primary: "#FFFFFF",
      secondary: "#999999",
    },
    neon: {
      primary: "#FF0080",
      secondary: "#7928CA",
    },
    glass: {
      primary: "#38BDF8",
      secondary: "#818CF8",
    },
    metallic: {
      primary: "#CBD5E1",
      secondary: "#F1F5F9",
    },
    gradient: {
      primary: "#FB923C",
      secondary: "#FDE68A",
    },
    watercolor: {
      primary: "#818CF8",
      secondary: "#22D3EE",
    },
  },
};

const CanvasSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  CanvasSliderProps
>(
  (
    {
      className,
      primaryColor,
      secondaryColor,
      variant = "watercolor",
      ...props
    },
    ref,
  ) => {
    const { theme = "light" } = useTheme();
    const [isHovered, setIsHovered] = React.useState(false);
    const [rippleKey, setRippleKey] = React.useState(0);

    const handleValueChange = () => {
      setRippleKey((prev) => prev + 1);
    };

    const colors = defaultColors[theme as keyof typeof defaultColors];
    const variantColors = colors[variant as keyof typeof colors];
    const primary = primaryColor || variantColors.primary;
    const secondary = secondaryColor || variantColors.secondary;

    const getTrackStyles = () => {
      const baseStyle = {
        transition: "all 0.3s ease",
      };

      switch (variant) {
        case "neon":
          return {
            ...baseStyle,
            background: `linear-gradient(90deg, 
              ${primary} 0%, 
              ${secondary} 100%
            )`,
            boxShadow: `0 0 10px ${primary}, 0 0 20px ${secondary}`,
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          };
        case "glass":
          return {
            ...baseStyle,
            background: `linear-gradient(90deg,
              ${primary}40 0%,
              ${secondary}40 100%
            )`,
            backdropFilter: "blur(8px)",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          };
        case "metallic":
          return {
            ...baseStyle,
            background: `linear-gradient(90deg,
              ${primary} 0%,
              ${secondary} 50%,
              ${primary} 100%
            )`,
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
          };
        case "gradient":
          return {
            ...baseStyle,
            background: `linear-gradient(90deg,
              ${primary} 0%,
              ${secondary} 100%
            )`,
            border: "none",
          };
        case "watercolor":
          return {
            ...baseStyle,
            background: `linear-gradient(90deg, 
              ${primary}80 0%, 
              ${secondary}80 100%
            )`,
            filter: "url(#watercolor)",
          };
        default:
          return {
            ...baseStyle,
            background: `linear-gradient(90deg, 
              ${primary} 0%, 
              ${secondary} 100%
            )`,
          };
      }
    };

    const getThumbStyles = () => {
      const baseStyle = {
        transition: "all 0.3s ease",
      };

      switch (variant) {
        case "neon":
          return {
            ...baseStyle,
            background: primary,
            boxShadow: `0 0 10px ${primary}, 0 0 20px ${primary}`,
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
          };
        case "glass":
          return {
            ...baseStyle,
            background: `${primary}40`,
            backdropFilter: "blur(8px)",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
          };
        case "metallic":
          return {
            ...baseStyle,
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
          };
        case "gradient":
          return {
            ...baseStyle,
            background: primary,
          };
        case "watercolor":
          return {
            ...baseStyle,
            background: primary,
            filter: "url(#watercolor)",
          };
        default:
          return {
            ...baseStyle,
            background: primary,
          };
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-6 w-full grow overflow-hidden rounded-full">
          <div
            className="absolute h-full w-full transition-all duration-300"
            style={getTrackStyles()}
          />
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="relative block h-8 w-8 rounded-full transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 z-10 rounded-full"
            style={getThumbStyles()}
            animate={{
              scale: isHovered ? 1.2 : 1,
            }}
          />
          <AnimatePresence>
            {variant === "watercolor" && rippleKey && (
              <motion.div
                key={rippleKey}
                className="absolute -z-10"
                style={{
                  top: "-100%",
                  left: "-100%",
                  width: "300%",
                  height: "300%",
                  borderRadius: "50%",
                  background: `${primary}40`,
                  pointerEvents: "none",
                }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </SliderPrimitive.Thumb>

        {variant === "watercolor" && (
          <svg width="0" height="0">
            <filter id="watercolor">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="3"
                seed="1"
              />
              <feDisplacementMap in="SourceGraphic" scale="10" />
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </svg>
        )}
      </SliderPrimitive.Root>
    );
  },
);
CanvasSlider.displayName = "CanvasSlider";

export { CanvasSlider };
