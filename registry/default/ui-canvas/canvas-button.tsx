"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// eslint-disable-next-line tailwindcss/classnames-order
const canvasButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        watercolor:
          "bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:saturate-150",
        oil: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white hover:saturate-150",
        charcoal:
          "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-black",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
      effect: {
        none: "",
        splash: "overflow-hidden",
        brush: "overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      effect: "none",
    },
  },
);

export interface CanvasButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof canvasButtonVariants> {
  asChild?: boolean;
}

const CanvasButton = React.forwardRef<HTMLButtonElement, CanvasButtonProps>(
  ({ className, variant, size, effect, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [splashPosition, setSplashPosition] = React.useState<{
      x: number;
      y: number;
    } | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (effect === "splash") {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setSplashPosition({ x, y });
        setTimeout(() => setSplashPosition(null), 1000);
      }
      props.onClick?.(event);
    };

    return (
      <Comp
        className={cn(
          canvasButtonVariants({ variant, size, effect, className }),
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {props.children}

        {effect === "splash" && splashPosition && (
          <motion.span
            initial={{ scale: 0, opacity: 0.75 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              width: 20,
              height: 20,
              left: splashPosition.x - 10,
              top: splashPosition.y - 10,
            }}
          />
        )}

        {effect === "brush" && (
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              transformOrigin: "left",
            }}
          />
        )}
      </Comp>
    );
  },
);
CanvasButton.displayName = "CanvasButton";

export { CanvasButton, canvasButtonVariants };
