"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface StudioLightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  size?: "sm" | "md" | "lg" | "full";
  color?: string;
  autoAnimate?: boolean;
  variant?: "soft" | "harsh" | "dramatic" | "rim" | "butterfly";
  followMouse?: boolean;
  lightPosition?: { x: number; y: number };
}

const sizeStyles = {
  sm: "w-64 h-64",
  md: "w-96 h-96",
  lg: "w-[32rem] h-[32rem]",
  full: "w-full h-full",
};

const variantStyles = {
  soft: {
    blur: "100px",
    opacity: 0.5,
    spread: 1.2,
    secondary: 0.3,
  },
  harsh: {
    blur: "30px",
    opacity: 0.7,
    spread: 0.8,
    secondary: 0.1,
  },
  dramatic: {
    blur: "50px",
    opacity: 0.8,
    spread: 1.5,
    secondary: 0.4,
  },
  rim: {
    blur: "20px",
    opacity: 0.9,
    spread: 0.6,
    secondary: 0.2,
  },
  butterfly: {
    blur: "40px",
    opacity: 0.6,
    spread: 1,
    secondary: 0.5,
  },
};

export function StudioLight({
  children,
  className,
  intensity = 1,
  size = "md",
  color = "#ffffff",
  autoAnimate = false,
  variant = "soft",
  followMouse = true,
  lightPosition,
}: StudioLightProps) {
  const { theme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const styles = variantStyles[variant];

  const lightX = useTransform(
    mouseX,
    [0, dimensions.width],
    [-50 * intensity, 50 * intensity],
  );
  const lightY = useTransform(
    mouseY,
    [0, dimensions.height],
    [-50 * intensity, 50 * intensity],
  );

  React.useEffect(() => {
    if (autoAnimate && !followMouse) {
      const animateLight = async () => {
        await animate(mouseX, dimensions.width, {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        });
      };

      const animateHeight = async () => {
        await animate(mouseY, dimensions.height, {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        });
      };

      animateLight();
      animateHeight();
    }
  }, [autoAnimate, followMouse, dimensions, mouseX, mouseY]);

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  React.useEffect(() => {
    if (lightPosition && !followMouse && !autoAnimate) {
      mouseX.set(lightPosition.x * dimensions.width);
      mouseY.set(lightPosition.y * dimensions.height);
    }
  }, [lightPosition, followMouse, autoAnimate, dimensions, mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", sizeStyles[size], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (followMouse) {
          mouseX.set(dimensions.width / 2);
          mouseY.set(dimensions.height / 2);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: lightX,
          y: lightY,
          width: `${200 * styles.spread}%`,
          height: `${200 * styles.spread}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: styles.opacity * intensity,
          filter: `blur(${styles.blur})`,
          mixBlendMode: theme === "dark" ? "screen" : "multiply",
        }}
      />

      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: useTransform(lightX, (x) => x * -0.5),
          y: useTransform(lightY, (y) => y * -0.5),
          width: `${150 * styles.spread}%`,
          height: `${150 * styles.spread}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: styles.opacity * styles.secondary * intensity,
          filter: `blur(${styles.blur})`,
          mixBlendMode: theme === "dark" ? "screen" : "multiply",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
