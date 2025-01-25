"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type MotionDivProps = HTMLMotionProps<"div">;

export interface ArtCanvasCardProps extends MotionDivProps {
  title: string;
  icon?: LucideIcon;
  expanded?: boolean;
  onToggle?: () => void;
  preview?: React.ReactNode;
  variant?: "canvas" | "polaroid" | "sketch" | "glass" | "neon" | "kinetic";
  interactive?: boolean;
  glowColor?: string;
  particleCount?: number;
}

const ArtCanvasCard = React.forwardRef<HTMLDivElement, ArtCanvasCardProps>(
  (
    {
      title,
      icon: Icon,
      expanded = false,
      onToggle,
      preview,
      variant = "canvas",
      interactive = false,
      glowColor = "#10b981",
      particleCount = 20,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    // Kinetic animation state
    const rotation = useMotionValue(0);
    const scale = useSpring(1, { stiffness: 200, damping: 20 });

    // Smooth spring animations for hover effects
    const hoverScale = useSpring(1, {
      stiffness: 300,
      damping: 25,
    });

    // Kinetic background animation
    useAnimationFrame((time) => {
      if (variant === "kinetic") {
        rotation.set(time / 50);
        scale.set(1 + Math.sin(time / 1000) * 0.1);
      }
    });

    // Mouse tracking for 3D effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      hoverScale.set(1.02);
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      mouseX.set(0);
      mouseY.set(0);
      hoverScale.set(1);
    };

    // Generate particles for neon variant
    const particles = React.useMemo(() => {
      if (variant !== "neon") return [];
      return Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 2 + 1,
      }));
    }, [variant, particleCount]);

    const variantStyles = {
      canvas: "bg-card dark:bg-card-dark border shadow-lg hover:shadow-xl",
      polaroid: "bg-white dark:bg-gray-900 p-2 rotate-2 shadow-polaroid",
      sketch: "bg-white dark:bg-gray-900 border-2 border-dashed shadow-sketch",
      glass:
        "bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-800/20",
      neon: cn(
        "border border-white/10 bg-black/80 dark:border-gray-800/20 dark:bg-black",
        "shadow-[0_0_15px_rgba(0,0,0,0.2)]",
        "dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
      ),
      kinetic:
        "bg-white/5 dark:bg-gray-900/5 backdrop-blur border border-white/10 dark:border-gray-800/10",
    };

    const contentStyles = {
      canvas: "bg-background dark:bg-background-dark",
      polaroid: "bg-white dark:bg-gray-900",
      sketch: "bg-white dark:bg-gray-900",
      glass: "bg-white/5 dark:bg-gray-900/5 backdrop-blur",
      neon: "bg-black/50 dark:bg-black/50",
      kinetic: "bg-white/5 dark:bg-gray-900/5 backdrop-blur",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg transition-colors duration-300",
          variantStyles[variant],
          interactive && "cursor-pointer",
          className
        )}
        style={{
          scale: hoverScale,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Neon glow effect */}
        {variant === "neon" && (
          <motion.div
            className="absolute inset-0 opacity-50 blur-xl"
            style={{
              backgroundColor: glowColor,
              scale: hoverScale,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {/* Floating particles for neon variant */}
        {variant === "neon" &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-1 w-1 rounded-full bg-white"
              animate={{
                y: [0, -100],
                x: [0, Math.sin(particle.id) * 50],
                opacity: [0, 1, 0],
                scale: [1, particle.scale, 1],
              }}
              transition={{
                duration: particle.speed * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y + 100}%`,
              }}
            />
          ))}

        {/* Kinetic background */}
        {variant === "kinetic" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20"
            style={{
              rotate: rotation,
              scale,
            }}
          />
        )}

        {/* Preview section */}
        <motion.div
          className="relative aspect-video overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          {preview}
        </motion.div>

        {/* Content section */}
        <motion.div
          className={cn(
            "relative space-y-2 p-4",
            contentStyles[variant],
            expanded && "pb-6"
          )}
          layout
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "h-5 w-5",
                    variant === "neon"
                      ? "text-white"
                      : "dark:text-foreground-dark text-foreground"
                  )}
                />
              )}
              <h3
                className={cn(
                  "font-semibold",
                  variant === "neon"
                    ? "text-white"
                    : "dark:text-foreground-dark text-foreground"
                )}
              >
                {title}
              </h3>
            </motion.div>
            {onToggle && (
              <motion.div
                initial={false}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "h-4 w-4 rounded-full",
                  variant === "neon"
                    ? "text-white"
                    : "dark:text-foreground-dark text-foreground"
                )}
              >
                ↓
              </motion.div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  opacity: { duration: 0.2 },
                }}
                className={cn(
                  variant === "neon"
                    ? "text-white/90"
                    : "dark:text-muted-foreground-dark text-muted-foreground"
                )}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }
);

ArtCanvasCard.displayName = "ArtCanvasCard";

export default ArtCanvasCard;
