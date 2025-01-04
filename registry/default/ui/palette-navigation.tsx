"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PaletteItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface PaletteNavigationProps {
  items: PaletteItem[];
  className?: string;
  layout?: "flex" | "circle" | "arc" | "line";
}

const defaultColors = [
  "from-red-500/80 to-orange-500/80",
  "from-blue-500/80 to-cyan-500/80",
  "from-green-500/80 to-emerald-500/80",
  "from-purple-500/80 to-pink-500/80",
  "from-yellow-500/80 to-amber-500/80",
];

export function PaletteNavigation({
  items,
  className,
  layout = "flex",
}: PaletteNavigationProps) {
  const getItemPosition = (index: number, total: number) => {
    switch (layout) {
      case "circle": {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        const radius = 120;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
      }
      case "arc": {
        // Create a 180-degree arc (π radians)
        const angleSpacing = Math.PI / (total - 1);
        // Start from -90 degrees (-π/2) to center the arc
        const startAngle = -Math.PI / 2;
        const angle = startAngle + index * angleSpacing;
        // Increase radius for better spacing
        const radius = 160;
        // Adjust y position to create a proper semi-circle
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius + radius,
        };
      }
      case "line": {
        const spacing = 100;
        const totalWidth = (total - 1) * spacing;
        const startX = -totalWidth / 2;
        return {
          x: startX + index * spacing,
          y: 0,
        };
      }
      default:
        return { x: 0, y: 0 };
    }
  };

  const containerStyles = cn(
    "relative",
    layout === "flex" &&
      "flex h-[400px] flex-wrap items-center justify-center gap-4 rounded-full p-4",
    layout === "arc" && "flex h-[600px] items-start justify-center pt-16",
    layout !== "flex" &&
      layout !== "arc" &&
      "flex h-[400px] items-center justify-center",
    "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white/10 before:backdrop-blur-md dark:before:bg-zinc-950/10",
    "after:absolute after:inset-0 after:-z-20 after:rounded-full after:bg-gradient-to-r after:from-primary/5 after:to-muted/5",
    className,
  );

  return (
    <TooltipProvider>
      <nav className={containerStyles}>
        {items.map((item, index) => {
          const position =
            layout !== "flex"
              ? getItemPosition(index, items.length)
              : undefined;

          return (
            <motion.div
              key={item.href}
              className={layout !== "flex" ? "absolute" : undefined}
              initial={
                position
                  ? { opacity: 0, scale: 0, x: position.x, y: position.y }
                  : { opacity: 0, scale: 0 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                ...(position && { x: position.x, y: position.y }),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.05,
              }}
            >
              <PaletteItem
                item={item}
                colorClass={
                  item.color || defaultColors[index % defaultColors.length]
                }
                layout={layout}
                index={index}
                total={items.length}
              />
            </motion.div>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}

interface PaletteItemProps {
  item: PaletteItem;
  colorClass: string;
  layout?: "flex" | "circle" | "arc" | "line";
  index?: number;
  total?: number;
}

function PaletteItem({
  item,
  colorClass,
  layout = "flex",
  index = 0,
  total = 1,
}: PaletteItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getTooltipSide = () => {
    if (layout === "arc") {
      const angleSpacing = Math.PI / (total - 1);
      const startAngle = -Math.PI / 2;
      const angle = startAngle + index * angleSpacing;
      return angle < 0 ? "bottom" : "top";
    }

    if (layout === "circle") {
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
      const direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      if (Math.abs(direction.x) > Math.abs(direction.y)) {
        return direction.x > 0 ? "right" : "left";
      }
      return direction.y > 0 ? "bottom" : "top";
    }

    return "bottom";
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition-shadow",
              "hover:shadow-xl hover:ring-2 hover:ring-white/20 dark:hover:ring-zinc-800/20",
              colorClass,
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon && (
              <div className="text-white dark:text-zinc-200">{item.icon}</div>
            )}
            {!item.icon && (
              <span className="text-sm font-medium text-white dark:text-zinc-200">
                {item.label.charAt(0)}
              </span>
            )}

            {/* Paint drip effect */}
            {/* <motion.div
              className={cn(
                "absolute -bottom-6 left-1/2 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b",
                colorClass,
              )}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered ? "2rem" : 0,
                opacity: isHovered ? 0.8 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "top",
              }}
            /> */}
          </motion.div>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side={getTooltipSide()}
        className="flex flex-col gap-1 bg-white text-foreground dark:bg-zinc-900"
        sideOffset={8}
      >
        <div className="whitespace-nowrap font-medium">{item.label}</div>
        {item.description && (
          <div className="text-xs text-muted-foreground">
            {item.description}
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
