"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export interface PaletteToastProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

interface ToastColors {
  background: string;
  text: string;
  accent: string;
}

const toastColors: Record<string, ToastColors> = {
  info: {
    background:
      "from-blue-100 to-blue-50 dark:from-blue-700/40 dark:to-blue-700/20",
    text: "text-blue-800 dark:text-blue-200",
    accent: "bg-blue-200 dark:bg-blue-700",
  },
  success: {
    background:
      "from-emerald-100 to-emerald-50 dark:from-emerald-700/40 dark:to-emerald-700/20",
    text: "text-emerald-800 dark:text-emerald-200",
    accent: "bg-emerald-200 dark:bg-emerald-700",
  },
  warning: {
    background:
      "from-amber-100 to-amber-50 dark:from-amber-700/40 dark:to-amber-700/20",
    text: "text-amber-800 dark:text-amber-200",
    accent: "bg-amber-200 dark:bg-amber-700",
  },
  error: {
    background:
      "from-rose-100 to-rose-50 dark:from-rose-700/40 dark:to-rose-700/20",
    text: "text-rose-800 dark:text-rose-200",
    accent: "bg-rose-200 dark:bg-rose-700",
  },
};

export function PaletteToast({
  message,
  type = "info",
  duration = 5000,
  onClose,
  className,
}: PaletteToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const colors = toastColors[type];

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: { duration: 0.2 },
          }}
          className={cn(
            "relative overflow-hidden rounded-lg p-4 shadow-lg",
            "bg-gradient-to-br backdrop-blur-[2px]",
            "dark:shadow-2xl dark:shadow-black/10",
            "border border-white/20 dark:border-white/10",
            colors.background,
            className
          )}
        >
          {/* Paint drip effect */}
          <div
            className={cn(
              "absolute -left-4 -top-4 h-12 w-12 rounded-full opacity-20 dark:opacity-30",
              colors.accent
            )}
          />
          <div
            className={cn(
              "absolute -bottom-4 -right-4 h-10 w-10 rounded-full opacity-20 dark:opacity-30",
              colors.accent
            )}
          />

          {/* Message content */}
          <div className="relative flex items-center justify-between gap-2">
            <p className={cn("font-medium", colors.text)}>{message}</p>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className={cn(
                "rounded-full p-1",
                colors.text,
                "hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <X size={14} />
            </button>
          </div>

          {/* Watercolor spread animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1.4],
              opacity: [0.3, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className={cn(
              "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full",
              colors.accent,
              "pointer-events-none opacity-10 dark:opacity-20"
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
