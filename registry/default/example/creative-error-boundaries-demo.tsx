"use client";

import React, { useState, ErrorInfo } from "react";
import CreativeErrorBoundaries from "@/registry/default/ui/creative-error-boundaries";
import { Button } from "@/components/ui/button";
import { Palette, Brush, Eraser, RefreshCw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const errors = {
  syntax: {
    message: "🎨 Unexpected brushstroke in the composition!",
    icon: <Brush className="h-4 w-4" />,
    description: "A wild syntax error appeared in your artistic code",
  },
  runtime: {
    message: "🖼️ Canvas dimensions exceeded artistic boundaries",
    icon: <Palette className="h-4 w-4" />,
    description: "Your artwork encountered a runtime exception",
  },
  logic: {
    message: "🎭 Color palette conflict detected in the artistic flow",
    icon: <AlertTriangle className="h-4 w-4" />,
    description: "A logical error disrupted your creative process",
  },
};

const BuggyComponent = ({ errorType }: { errorType: keyof typeof errors }) => {
  throw new Error(errors[errorType].message);
  return null;
};

const ArtworkComponent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-canvas-100/50 dark:bg-canvas-900/50 relative space-y-4 overflow-hidden rounded-lg p-8 backdrop-blur-sm"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10" />
    <div className="relative">
      <div className="flex items-center space-x-3">
        <div className="h-4 w-4 animate-pulse rounded-full bg-emerald-500" />
        <h4 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text font-medium text-transparent dark:from-emerald-400 dark:to-teal-400">
          Masterpiece in Progress
        </h4>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="from-canvas-200/50 to-canvas-300/50 dark:from-canvas-800/50 dark:to-canvas-700/50 aspect-square rounded-lg bg-gradient-to-br"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <p className="text-canvas-600 dark:text-canvas-400 mt-4">
        Your artwork is rendering beautifully in this creative space.
      </p>
    </div>
  </motion.div>
);

const ThemeButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Button
    variant={active ? "default" : "outline"}
    onClick={onClick}
    className={`rounded-md px-4 py-2 transition-all duration-200 ${
      active ? "shadow-md" : "hover:shadow-sm"
    }`}
  >
    {children}
  </Button>
);

export default function CreativeErrorBoundariesDemo() {
  const [activeError, setActiveError] = useState<keyof typeof errors | null>(
    null
  );
  const [selectedTheme, setSelectedTheme] = useState<
    "watercolor" | "sketch" | "oil-painting"
  >("watercolor");

  const handleErrorCapture = (error: Error, errorInfo: ErrorInfo) => {
    console.log("Error captured:", error);
    console.log("Error Info:", errorInfo);
  };

  const themes = [
    {
      value: "watercolor",
      label: "Watercolor",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
    {
      value: "sketch",
      label: "Sketch",
      icon: <Brush className="mr-2 h-4 w-4" />,
    },
    {
      value: "oil-painting",
      label: "Oil Painting",
      icon: <Eraser className="mr-2 h-4 w-4" />,
    },
  ] as const;

  return (
    <div className="z-30 mx-auto w-full max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-white/50 p-6 backdrop-blur-sm dark:bg-black/50"
      >
        {/* Theme Selection */}
        <div className="space-y-4">
          <h3 className="text-canvas-700 dark:text-canvas-300 text-sm font-medium">
            Select Artistic Style
          </h3>
          <div className="flex flex-wrap justify-start gap-4">
            {themes.map((theme) => (
              <ThemeButton
                key={theme.value}
                active={selectedTheme === theme.value}
                onClick={() => setSelectedTheme(theme.value)}
              >
                <span className="flex items-center">
                  {theme.icon}
                  {theme.label}
                </span>
              </ThemeButton>
            ))}
          </div>
        </div>

        {/* Error Triggers */}
        <div className="mt-8 space-y-4">
          <h3 className="text-canvas-700 dark:text-canvas-300 text-sm font-medium">
            Test Error Scenarios
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(errors).map(([type, error]) => (
              <ThemeButton
                key={type}
                active={activeError === type}
                onClick={() => setActiveError(type as keyof typeof errors)}
              >
                <span className="flex items-center">
                  {error.icon}
                  <span className="ml-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </span>
              </ThemeButton>
            ))}
            {activeError && (
              <Button
                variant="outline"
                onClick={() => setActiveError(null)}
                className="rounded-md px-4 py-2 transition-all duration-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Demo
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Error Boundary Demo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeError ?? "default"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid gap-6"
        >
          <CreativeErrorBoundaries
            theme={selectedTheme}
            onErrorCapture={handleErrorCapture}
          >
            {activeError ? (
              <BuggyComponent errorType={activeError} />
            ) : (
              <ArtworkComponent />
            )}
          </CreativeErrorBoundaries>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
