import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionTextProps {
  text: string;
  className?: string;
  effect?: "fade" | "slide" | "glitch";
  duration?: number;
  delay?: number;
  stagger?: number;
  color?: string;
  fontSize?: string | number;
}

type VariantType = {
  initial: any;
  animate: any;
  transition?: {
    duration?: number;
    repeat?: number;
    repeatDelay?: number;
    delay?: number;
    ease?: string;
  };
};

const effectVariants: Record<string, (index: number) => VariantType> = {
  fade: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      delay: index * 0.1,
    },
  }),
  slide: (index: number) => ({
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
      duration: 0.3,
      delay: index * 0.08,
    },
  }),
  glitch: (index: number) => ({
    initial: { x: 0 },
    animate: {
      x: [0, -3, 3, -3, 3, 0],
      y: [0, 2, -2, 2, -2, 0],
      filter: [
        "none",
        "brightness(150%) contrast(150%)",
        "none",
        "brightness(150%) contrast(150%)",
        "none",
      ],
    },
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 4,
      delay: index * 0.05,
    },
  }),
};

export default function MotionText({
  text,
  className,
  effect = "fade",
  duration = 0.3,
  delay = 0,
  stagger = 0.05,
  color,
  fontSize,
}: MotionTextProps) {
  const characters = text.split("");

  return (
    <span className={cn("inline-block", className)} style={{ color, fontSize }}>
      {characters.map((char, index) => {
        const variant = effectVariants[effect](index);

        return (
          <motion.span
            key={index}
            initial={variant.initial}
            animate={variant.animate}
            transition={variant.transition}
            className="relative inline-block"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
}
