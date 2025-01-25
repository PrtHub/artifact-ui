import React, { useEffect, useRef } from "react";
import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div">;

export interface PrismHeroProps extends MotionDivProps {
  texts?: string[];
  animationStyle?:
    | "typing"
    | "fade"
    | "slide"
    | "morph"
    | "bounce"
    | "flip"
    | "zoom"
    | "rotate"
    | "elastic"
    | "wave";
  typingSpeed?: number;
  backgroundColor?: string;
  backgroundColors?: [string, string, string, string];
  overlayColor?: string;
  textGradient?: {
    from: string;
    to: string;
  };
  className?: string;
}

const textVariants: Record<string, Variants> = {
  typing: {
    initial: { width: "0%" },
    animate: { width: "100%" },
    exit: { width: "0%" },
  },
  fade: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slide: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  },
  morph: {
    initial: { filter: "blur(10px)", opacity: 0, scale: 1.2 },
    animate: { filter: "blur(0px)", opacity: 1, scale: 1 },
    exit: { filter: "blur(10px)", opacity: 0, scale: 0.8 },
  },
  bounce: {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  flip: {
    initial: {
      rotateX: 90,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      rotateX: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    exit: {
      rotateX: -90,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  },
  zoom: {
    initial: {
      scale: 2,
      opacity: 0,
      filter: "blur(4px)",
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.3 },
    },
  },
  rotate: {
    initial: {
      rotate: 180,
      scale: 0,
      opacity: 0,
    },
    animate: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    exit: {
      rotate: -180,
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  elastic: {
    initial: {
      scaleX: 0,
      opacity: 0,
    },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  wave: {
    initial: {
      y: 20,
      opacity: 0,
      skewX: -15,
    },
    animate: {
      y: 0,
      opacity: 1,
      skewX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      skewX: 15,
      transition: { duration: 0.3 },
    },
  },
};

const backgroundVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function PrismHero({
  texts = ["Welcome", "to", "Artifact UI"],
  animationStyle = "fade",
  typingSpeed = 40,
  backgroundColor = "#1a1a1a",
  backgroundColors = [
    "rgba(26, 26, 26, 0.8)",
    "rgba(42, 42, 42, 0.85)",
    "rgba(58, 58, 58, 0.9)",
    "rgba(74, 74, 74, 0.95)",
  ],
  overlayColor = "rgba(120,119,198,0.3)",
  textGradient = {
    from: "white",
    to: "rgba(255, 255, 255, 0.8)",
  },
  className,
  ...props
}: PrismHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const interpolateColor = () => {
    const index = Math.floor(scrollProgress * (backgroundColors.length - 1));
    return backgroundColors[index];
  };

  return (
    <motion.div
      ref={ref}
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden rounded",
        className
      )}
      style={{
        backgroundColor: interpolateColor(),
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
      }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${overlayColor}, transparent 80%)`,
        }}
      />
      <div className="perspective-1000 relative flex items-center justify-center">
        <motion.div
          key={currentTextIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textVariants[animationStyle]}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "relative z-10 overflow-hidden whitespace-nowrap text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl",
            animationStyle === "typing" && "mx-auto"
          )}
        >
          <span
            className={cn(
              "bg-clip-text text-transparent",
              animationStyle === "typing" && "block text-center"
            )}
            style={{
              ...{
                backgroundImage: `linear-gradient(to right, ${textGradient.from}, ${textGradient.to})`,
              },
              ...(animationStyle === "typing"
                ? {
                    width: "fit-content",
                    margin: "0 auto",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }
                : {}),
            }}
          >
            {texts[currentTextIndex]}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
