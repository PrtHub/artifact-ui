"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface StatisticProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "outline" | "glass" | "neon";
  animation?: "pulse" | "bounce" | "none" | "float" | "glow";
  trend?: number;
}

export default function ArtisticStatisticsCard({
  title,
  value,
  description,
  icon,
  className,
  variant = "default",
  animation = "none",
  trend,
}: StatisticProps) {
  const variants = {
    default: "bg-card text-card-foreground shadow-lg dark:shadow-primary/5",
    gradient:
      "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 text-primary-foreground shadow-xl shadow-primary/20",
    outline:
      "border border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40",
    glass:
      "bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl dark:bg-black/10",
    neon: "bg-background border-2 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] dark:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)]",
  };

  const animations = {
    none: "",
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    float: "hover:translate-y-[-8px] transition-transform duration-300",
    glow: "hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.3)] transition-shadow duration-300",
  };

  const getTrendColor = (trend?: number) => {
    if (!trend) return "";
    return trend > 0
      ? "text-green-500 dark:text-green-400"
      : "text-red-500 dark:text-red-400";
  };

  const getTrendIcon = (trend?: number) => {
    if (!trend) return null;
    return trend > 0 ? (
      <span className="inline-block rotate-45">↗</span>
    ) : (
      <span className="inline-block -rotate-45">↘</span>
    );
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 transition-all duration-300",
        "hover:scale-[1.02]",
        variants[variant],
        animations[animation],
        className,
      )}
    >
      {icon && (
        <div className="absolute right-4 top-4 text-4xl opacity-20 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-30">
          {icon}
        </div>
      )}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground/80">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {trend !== undefined && (
            <span className={cn("text-sm font-medium", getTrendColor(trend))}>
              {trend > 0 ? "+" : ""}
              {trend}% {getTrendIcon(trend)}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground/70">{description}</p>
        )}
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full",
          variant === "gradient"
            ? "bg-gradient-to-r from-white/20 via-white/40 to-white/20"
            : "bg-gradient-to-r from-primary/20 via-primary to-primary/20",
        )}
      />
    </div>
  );
}
