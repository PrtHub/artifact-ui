import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tag {
  id: string;
  label: string;
}

interface InfiniteScrollProps {
  className?: string;
  /** Array of tag objects */
  tags: Tag[];
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Direction of the scroll */
  direction?: "normal" | "reverse";
  /** Background color of the container */
  containerColor?: string;
  /** Whether to show the fade effect at the edges */
  showFade?: boolean;
}

export function InfiniteScroll({
  className,
  tags,
  duration = 15000,
  direction = "normal",
  containerColor = "#ffffff",
  showFade = true,
}: InfiniteScrollProps) {
  // Create two groups for seamless scrolling
  const group = [...tags, ...tags];

  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col gap-4 overflow-hidden py-3",
        className,
      )}
    >
      <div className="flex">
        <motion.div
          className="flex shrink-0"
          animate={{
            x: direction === "normal" ? "-50%" : "0%",
          }}
          initial={{
            x: direction === "normal" ? "0%" : "-50%",
          }}
          transition={{
            x: {
              duration: duration / 1000,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {group.map((tag, idx) => (
            <motion.div
              key={`${tag.id}-${idx}`}
              className="mr-4 flex items-center gap-[0.2rem] rounded-[0.4rem] bg-black px-4 py-[0.7rem] text-[0.9rem] text-white shadow-[0_0.1rem_0.2rem_rgb(0_0_0_/_20%),0_0.1rem_0.5rem_rgb(0_0_0_/_30%),0_0.2rem_1.5rem_rgb(0_0_0_/_40%)] dark:bg-white dark:text-black"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tag.label}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0"
          animate={{
            x: direction === "normal" ? "-50%" : "0%",
          }}
          initial={{
            x: direction === "normal" ? "0%" : "-50%",
          }}
          transition={{
            x: {
              duration: duration / 1000,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {group.map((tag, idx) => (
            <motion.div
              key={`${tag.id}-${idx}-clone`}
              className="mr-4 flex items-center gap-[0.2rem] rounded-[0.4rem] bg-black px-4 py-[0.7rem] text-[0.9rem] text-white shadow-[0_0.1rem_0.2rem_rgb(0_0_0_/_20%),0_0.1rem_0.5rem_rgb(0_0_0_/_30%),0_0.2rem_1.5rem_rgb(0_0_0_/_40%)] dark:bg-white dark:text-black"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tag.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
      {showFade && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${containerColor}, transparent 30%, transparent 70%, ${containerColor})`,
          }}
        />
      )}
    </div>
  );
}
