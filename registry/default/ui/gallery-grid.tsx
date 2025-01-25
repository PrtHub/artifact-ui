"use client";

import * as React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div">;

export interface GalleryGridProps extends MotionDivProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
  hover?: "zoom" | "lift" | "tilt" | "none";
}

export interface GalleryItemProps extends MotionDivProps {
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  children: React.ReactNode;
  hover?: "zoom" | "lift" | "tilt" | "none";
  priority?: boolean;
}

const hoverEffects = {
  zoom: {
    scale: 1.03,
    transition: { duration: 0.3 },
  },
  lift: {
    y: -10,
    transition: { duration: 0.3 },
  },
  tilt: {
    rotateX: 10,
    rotateY: 10,
    transition: { duration: 0.3 },
  },
  none: {},
};

const GalleryItem = React.forwardRef<HTMLDivElement, GalleryItemProps>(
  (
    {
      className,
      aspectRatio = "square",
      children,
      hover = "zoom",
      priority,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const aspectRatioMap = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-input/10 bg-gradient-to-br from-background/40 via-background/20 to-background/40 backdrop-blur-sm transition-all duration-300",
          "hover:border-input/30 hover:shadow-[0_0_1rem_-0.25rem] hover:shadow-primary/20",
          aspectRatioMap[aspectRatio],
          className
        )}
        initial={false}
        whileHover={hoverEffects[hover]}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />
        {children}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-end p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full space-y-2">
                {React.Children.map(
                  React.Children.toArray(children).filter(
                    (child) =>
                      React.isValidElement(child) && child.type === "div"
                  ),
                  (child) => child
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
GalleryItem.displayName = "GalleryItem";

const GalleryGrid = React.forwardRef<HTMLDivElement, GalleryGridProps>(
  (
    { className, columns = 3, gap = 4, children, hover = "zoom", ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "masonry-grid",
          `gap- columns-1${gap} lg:columns- sm:columns-2${columns}`,
          className
        )}
        style={{
          columnGap: `${gap * 0.25}rem`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, staggerChildren: 0.1 }}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <motion.div
                key={index}
                className="masonry-item mb-4 break-inside-avoid"
                style={{
                  marginBottom: `${gap * 0.25}rem`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {React.cloneElement(child as React.ReactElement, {
                  hover,
                  priority: index < 4,
                })}
              </motion.div>
            );
          }
          return child;
        })}
      </motion.div>
    );
  }
);
GalleryGrid.displayName = "GalleryGrid";

export { GalleryGrid, GalleryItem };
