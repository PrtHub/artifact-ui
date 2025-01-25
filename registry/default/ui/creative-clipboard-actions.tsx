"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Check, Copy, Link, ClipboardCheck, ClipboardCopy } from "lucide-react";

type Variant = "default" | "minimal" | "floating" | "gradient" | "outline";
type Size = "sm" | "md" | "lg";

interface CreativeClipboardActionsProps {
  text: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  showLink?: boolean;
  onCopy?: () => void;
}

const variants = {
  default: {
    button: {
      base: "rounded-lg border transition-all duration-200",
      idle: "border-muted-foreground/20 dark:border-muted-foreground/10 bg-background dark:bg-background/80 hover:bg-muted/80 dark:hover:bg-muted/20",
      copied:
        "border-green-500/50 dark:border-green-400/30 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    },
    icon: {
      idle: "text-muted-foreground dark:text-muted-foreground/80",
      copied: "text-green-600 dark:text-green-400",
    },
  },
  minimal: {
    button: {
      base: "rounded-md transition-all duration-200",
      idle: "hover:bg-muted/80 dark:hover:bg-muted/20",
      copied: "text-green-600 dark:text-green-400",
    },
    icon: {
      idle: "text-muted-foreground dark:text-muted-foreground/80",
      copied: "text-green-600 dark:text-green-400",
    },
  },
  floating: {
    button: {
      base: "rounded-full shadow-lg transition-all duration-300",
      idle: "bg-background dark:bg-background/90 hover:shadow-xl hover:-translate-y-0.5",
      copied:
        "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 shadow-green-500/20 dark:shadow-green-400/20",
    },
    icon: {
      idle: "text-muted-foreground dark:text-muted-foreground/80",
      copied: "text-green-600 dark:text-green-400",
    },
  },
  gradient: {
    button: {
      base: "rounded-lg transition-all duration-300 bg-gradient-to-r",
      idle: "from-primary/10 to-primary-foreground/10 dark:from-primary/20 dark:to-primary-foreground/20 hover:from-primary/20 hover:to-primary-foreground/20 dark:hover:from-primary/30 dark:hover:to-primary-foreground/30",
      copied:
        "from-green-500/20 to-green-400/20 dark:from-green-500/30 dark:to-green-400/30",
    },
    icon: {
      idle: "text-primary dark:text-primary/90",
      copied: "text-green-600 dark:text-green-400",
    },
  },
  outline: {
    button: {
      base: "rounded-lg border-2 transition-all duration-200",
      idle: "border-primary/50 dark:border-primary/30 hover:border-primary dark:hover:border-primary/50",
      copied: "border-green-500/50 dark:border-green-400/30",
    },
    icon: {
      idle: "text-primary dark:text-primary/90",
      copied: "text-green-600 dark:text-green-400",
    },
  },
};

const sizes = {
  sm: {
    button: "p-2",
    icon: "h-4 w-4",
  },
  md: {
    button: "p-3",
    icon: "h-5 w-5",
  },
  lg: {
    button: "p-4",
    icon: "h-6 w-6",
  },
};

export default function CreativeClipboardActions({
  text,
  variant = "default",
  size = "md",
  className,
  showLink = false,
  onCopy,
}: CreativeClipboardActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const IconComponent = showLink
    ? copied
      ? Check
      : Link
    : copied
      ? ClipboardCheck
      : ClipboardCopy;

  return (
    <motion.button
      onClick={handleCopy}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        variants[variant].button.base,
        variants[variant].button[copied ? "copied" : "idle"],
        sizes[size].button,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={copied ? "copied" : "idle"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative"
        >
          <IconComponent
            className={cn(
              variants[variant].icon[copied ? "copied" : "idle"],
              sizes[size].icon
            )}
          />
          {variant !== "minimal" && isHovered && !copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -right-1 -top-8 whitespace-nowrap rounded-md bg-foreground/90 px-2 py-1 text-xs text-background dark:bg-background/90 dark:text-foreground"
            >
              {showLink ? "Copy Link" : "Copy"}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
