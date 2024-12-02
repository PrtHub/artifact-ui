"use client";

import * as React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CanvasDockProps {
  className?: string;
  children?: React.ReactNode;
  position?: "bottom" | "left" | "right";
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  variant?:
    | "wooden"
    | "metallic"
    | "modern"
    | "glass"
    | "neon"
    | "chalk"
    | "paper"
    | "canvas";
}

interface CanvasDockItemProps {
  icon?: React.ReactNode;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?: "brush" | "pencil" | "palette" | "tool";
}

const variantStyles = {
  wooden: {
    dock: "bg-gradient-to-b from-amber-800 to-amber-950 border-amber-600",
    shadow: "shadow-amber-900/20",
    texture: "bg-[url('/wood-texture.png')] bg-repeat",
  },
  metallic: {
    dock: "bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 border-slate-400 dark:border-slate-600",
    shadow: "shadow-slate-900/30",
    texture: "bg-[url('/metal-texture.png')] bg-repeat",
  },
  modern: {
    dock: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
    shadow: "shadow-black/10 dark:shadow-black/30",
    texture: "",
  },
  glass: {
    dock: "bg-white/10 dark:bg-slate-900/10 border-white/20 dark:border-slate-700/20 backdrop-blur-lg",
    shadow: "shadow-white/10 dark:shadow-black/10",
    texture: "bg-gradient-to-b from-white/5 to-black/5",
  },
  neon: {
    dock: "bg-black/80 dark:bg-black border-[#FF00FF]/30 dark:border-[#00FFFF]/30",
    shadow: "shadow-[#FF00FF]/20 dark:shadow-[#00FFFF]/20",
    texture: "bg-gradient-to-r from-[#FF00FF]/10 to-[#00FFFF]/10",
  },
  watercolor: {
    dock: "bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800",
    shadow: "shadow-blue-500/10 dark:shadow-blue-500/20",
    texture:
      "[mask-image:url('/watercolor-mask.svg')] [mask-size:contain] bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/50 dark:to-purple-900/50",
  },
  chalk: {
    dock: "bg-slate-800 dark:bg-slate-950 border-slate-700 dark:border-slate-800",
    shadow: "shadow-slate-900/40",
    texture: "bg-[url('/chalk-texture.png')] bg-repeat opacity-90",
  },
  paper: {
    dock: "bg-amber-50 dark:bg-amber-950 border-amber-200/50 dark:border-amber-800/50",
    shadow: "shadow-amber-900/10",
    texture: "bg-[url('/paper-texture.png')] bg-repeat",
  },
  canvas: {
    dock: "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700",
    shadow: "shadow-neutral-900/20",
    texture: "bg-[url('/canvas-texture.png')] bg-repeat",
  },
};

const itemVariants = {
  brush: {
    idle: { rotate: 0, scale: 1 },
    hover: { rotate: -15, scale: 1.1 },
    selected: { rotate: -15, scale: 1.15, y: -8 },
  },
  pencil: {
    idle: { rotate: 0, scale: 1 },
    hover: { rotate: 15, scale: 1.1 },
    selected: { rotate: 15, scale: 1.15, y: -8 },
  },
  palette: {
    idle: { rotate: 0, scale: 1 },
    hover: { rotate: 0, scale: 1.1 },
    selected: { rotate: 0, scale: 1.15, y: -8 },
  },
  tool: {
    idle: { rotate: 0, scale: 1 },
    hover: { scale: 1.1 },
    selected: { scale: 1.15, y: -8 },
  },
};

const paintSplatterColors = [
  "rgb(239 68 68)", // red
  "rgb(34 197 94)", // green
  "rgb(59 130 246)", // blue
  "rgb(168 85 247)", // purple
  "rgb(249 115 22)", // orange
];

export const CanvasDockItem = React.forwardRef<
  HTMLDivElement,
  CanvasDockItemProps
>(
  (
    {
      className,
      icon,
      label,
      selected,
      onClick,
      variant = "tool",
      children,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation();
    const [splatterKey, setSplatterKey] = React.useState(0);

    const handleClick = () => {
      if (onClick) {
        onClick();
        setSplatterKey((prev) => prev + 1);
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg",
          "transition-colors hover:bg-black/5 dark:hover:bg-white/5",
          selected && "bg-black/10 dark:bg-white/10",
          className,
        )}
        variants={itemVariants[variant]}
        initial="idle"
        whileHover="hover"
        animate={selected ? "selected" : "idle"}
        onClick={handleClick}
        {...props}
      >
        {icon || children}
        <AnimatePresence>
          {selected && splatterKey > 0 && (
            <motion.div
              key={splatterKey}
              className="pointer-events-none absolute"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="h-8 w-8 rounded-full"
                style={{
                  background:
                    paintSplatterColors[
                      Math.floor(Math.random() * paintSplatterColors.length)
                    ],
                  filter: "url(#paint-splatter)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {label && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-14 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 dark:bg-white dark:text-slate-900"
            initial={{ opacity: 0, y: -4 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {label}
          </motion.div>
        )}
      </motion.div>
    );
  },
);

CanvasDockItem.displayName = "CanvasDockItem";

const CanvasDock = React.forwardRef<HTMLDivElement, CanvasDockProps>(
  (
    {
      className,
      children,
      position = "bottom",
      collapsed = false,
      onCollapsedChange,
      variant = "wooden",
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const controls = useAnimation();

    const styles = variantStyles[variant];

    React.useEffect(() => {
      setIsCollapsed(collapsed);
    }, [collapsed]);

    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);

      // Animate the brush stroke effect
      controls.start({
        pathLength: newCollapsed ? 0 : 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    };

    const positionClasses = {
      bottom: "bottom-4 left-1/2 -translate-x-1/2 flex-row",
      left: "left-4 top-1/2 -translate-y-1/2 flex-col",
      right: "right-4 top-1/2 -translate-y-1/2 flex-col",
    };

    return (
      <>
        <motion.div
          ref={ref}
          className={cn(
            "fixed flex items-center justify-center gap-2 rounded-2xl border p-2",
            styles.dock,
            styles.shadow,
            styles.texture,
            positionClasses[position],
            isCollapsed && "p-1",
            className,
          )}
          initial={false}
          animate={{
            width: isCollapsed
              ? "auto"
              : position === "bottom"
                ? "auto"
                : "5rem",
            height: isCollapsed
              ? "auto"
              : position === "bottom"
                ? "5rem"
                : "auto",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <motion.button
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              "hover:bg-black/5 dark:hover:bg-white/5",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            )}
            onClick={handleToggleCollapse}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                rotate: isCollapsed
                  ? position === "bottom"
                    ? 180
                    : position === "left"
                      ? 90
                      : -90
                  : 0,
              }}
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
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <svg width="0" height="0">
          <filter id="paint-splatter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              seed="1"
            />
            <feDisplacementMap in="SourceGraphic" scale="10" />
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </svg>

        <svg
          className="pointer-events-none fixed inset-0"
          style={{ zIndex: -1 }}
        >
          <motion.path
            d="M 0 0 Q 100 50, 200 0 T 400 0"
            stroke={theme === "dark" ? "white" : "black"}
            strokeWidth="2"
            strokeDasharray="0 1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
        </svg>
      </>
    );
  },
);

CanvasDock.displayName = "CanvasDock";

export { CanvasDock };
