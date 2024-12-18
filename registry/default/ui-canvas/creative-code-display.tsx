"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { Check, Clipboard, Download, Code2 } from "lucide-react";
import { cva } from "class-variance-authority";

const containerVariants = cva(
  "relative overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-slate-200/20 dark:border-zinc-700/50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-zinc-900/20",
        glass:
          "border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-300 hover:shadow-2xl dark:border-black/20 dark:bg-black/10 dark:hover:border-black/30",
        solid:
          "border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:border-neutral-700 dark:from-neutral-900 dark:to-neutral-800",
        terminal:
          "border-emerald-200/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-mono text-emerald-400/90 shadow-2xl shadow-emerald-900/10 [text-shadow:0_0_12px_rgba(16,185,129,0.2)] dark:border-emerald-900/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:shadow-emerald-900/20",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4 text-base",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface CreativeCodeDisplayProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  variant?: "default" | "glass" | "solid" | "terminal";
  size?: "sm" | "default" | "lg";
  showControls?: boolean;
  title?: string;
}

export default function CreativeCodeDisplay({
  code,
  language = "javascript",
  showLineNumbers = true,
  className,
  variant = "default",
  size = "default",
  showControls = true,
  title,
}: CreativeCodeDisplayProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    if (showLineNumbers) {
      Prism.highlightAll();
    }
  }, [code, showLineNumbers]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const isDark = theme === "dark" || variant === "terminal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(containerVariants({ variant, size }), className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && variant !== "terminal" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isDark ? 0.5 : 0.3 }}
            exit={{ opacity: 0 }}
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br",
              isDark
                ? "from-primary/20 to-transparent"
                : "from-primary/10 to-transparent",
            )}
          />
        )}
      </AnimatePresence>

      {variant === "terminal" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_50%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-500/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-emerald-500/5 blur-3xl" />
        </>
      )}

      {showControls && (
        <div className="relative">
          {title && (
            <div className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Code2
                className={cn(
                  "h-4 w-4",
                  isDark ? "text-primary" : "text-slate-600",
                )}
              />
              <span
                className={cn(
                  "text-muted-foreground",
                  isDark ? "text-slate-400" : "text-slate-600",
                )}
              >
                {title}
              </span>
            </div>
          )}
          <div className="absolute right-0 top-0 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className={cn(
                "rounded-lg p-2 transition-colors",
                isDark
                  ? "bg-primary/10 hover:bg-primary/20"
                  : "bg-slate-100 hover:bg-slate-200",
              )}
              title="Copy code"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key="check"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key="copy"
                  >
                    <Clipboard
                      className={cn(
                        "h-4 w-4",
                        isDark ? "text-primary" : "text-slate-600",
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className={cn(
                "rounded-lg p-2 transition-colors",
                isDark
                  ? "bg-primary/10 hover:bg-primary/20"
                  : "bg-slate-100 hover:bg-slate-200",
              )}
              title="Download code"
            >
              <Download
                className={cn(
                  "h-4 w-4",
                  isDark ? "text-primary" : "text-slate-600",
                )}
              />
            </motion.button>
          </div>
        </div>
      )}

      <pre
        className={cn(
          "scrollbar-thin scrollbar-track-transparent hover:scrollbar-thumb-primary/30 mt-2 overflow-x-auto rounded",
          showControls && title && "mt-6",
          showLineNumbers && "line-numbers",
          isDark ? "scrollbar-thumb-primary/20" : "scrollbar-thumb-slate-300",
        )}
      >
        <code className={`language-${language} block`}>{code}</code>
      </pre>

      {variant === "glass" && (
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br opacity-50",
            isDark
              ? "from-primary/10 via-transparent to-primary/5"
              : "to-primary/2 from-primary/5 via-transparent",
          )}
        />
      )}
    </motion.div>
  );
}
