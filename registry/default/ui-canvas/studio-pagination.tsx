"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";

type PaginationVariant =
  | "default"
  | "outline"
  | "ghost"
  | "minimal"
  | "gradient";
type PaginationShape = "rounded" | "square" | "pill";
type PaginationSize = "sm" | "md" | "lg";
type PaginationAnimation = "fade" | "slide" | "scale" | "none";

interface StudioPaginationProps {
  totalPages: number;
  currentPage: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  isLoading?: boolean;
  className?: string;
  variant?: PaginationVariant;
  shape?: PaginationShape;
  size?: PaginationSize;
  showFirstLast?: boolean;
  showPageSize?: boolean;
  animation?: PaginationAnimation;
  showProgress?: boolean;
  enableKeyboard?: boolean;
  enableSwipe?: boolean;
  enableMouseWheel?: boolean;
  customColors?: {
    active?: string;
    hover?: string;
    text?: string;
  };
}

const variantStyles: Record<PaginationVariant, string> = {
  default: "bg-background/95 border shadow-sm",
  outline: "border-2",
  ghost: "hover:bg-muted/50",
  minimal: "",
  gradient:
    "bg-gradient-to-r from-primary/20 via-background to-primary/20 border shadow-sm",
};

const shapeStyles: Record<PaginationShape, string> = {
  rounded: "rounded-lg",
  square: "rounded-none",
  pill: "rounded-full",
};

const sizeStyles: Record<PaginationSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-9 w-9 text-base",
};

const containerSizeStyles: Record<PaginationSize, string> = {
  sm: "p-1 gap-1",
  md: "p-2 gap-2",
  lg: "p-3 gap-3",
};

const animations: Record<PaginationAnimation, any> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.2 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.2 },
  },
  none: {},
};

export default function StudioPagination({
  totalPages,
  currentPage,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  className,
  variant = "default",
  shape = "rounded",
  size = "md",
  showFirstLast = true,
  showPageSize = false,
  animation = "fade",
  showProgress = false,
  enableKeyboard = true,
  enableSwipe = true,
  enableMouseWheel = true,
  customColors,
}: StudioPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  // Keyboard navigation
  useHotkeys(
    "left",
    () => {
      if (enableKeyboard && !isLoading && currentPage > 1) {
        setDirection("left");
        handlePageChange(currentPage - 1);
      }
    },
    [currentPage, isLoading],
  );

  useHotkeys(
    "right",
    () => {
      if (enableKeyboard && !isLoading && currentPage < totalPages) {
        setDirection("right");
        handlePageChange(currentPage + 1);
      }
    },
    [currentPage, isLoading],
  );

  // Swipe navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (enableSwipe && !isLoading && currentPage < totalPages) {
        setDirection("right");
        handlePageChange(currentPage + 1);
      }
    },
    onSwipedRight: () => {
      if (enableSwipe && !isLoading && currentPage > 1) {
        setDirection("left");
        handlePageChange(currentPage - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Mouse wheel navigation
  useEffect(() => {
    if (!enableMouseWheel) return;

    const handleWheel = (e: WheelEvent) => {
      if (isLoading) return;
      if (e.deltaY > 0 && currentPage < totalPages) {
        setDirection("right");
        handlePageChange(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 1) {
        setDirection("left");
        handlePageChange(currentPage - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [currentPage, totalPages, isLoading, enableMouseWheel]);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const buttonStyles = cn(
    sizeStyles[size],
    shapeStyles[shape],
    "border-border/50",
    "hover:bg-muted/50 dark:hover:bg-muted/50",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    customColors?.hover && `hover:${customColors.hover}`,
    customColors?.text && customColors.text,
  );

  const progressWidth = (currentPage / totalPages) * 100;

  return (
    <div
      ref={containerRef}
      {...swipeHandlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.nav
        className={cn(
          "relative flex items-center justify-between",
          containerSizeStyles[size],
          variantStyles[variant],
          shapeStyles[shape],
          "bg-background/95 text-foreground transition-all duration-200",
          "dark:bg-background/95 dark:text-foreground dark:shadow-md dark:shadow-primary/5",
          isHovered && "scale-102",
          className,
        )}
        role="navigation"
        aria-label="Pagination"
        initial={false}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {showProgress && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="flex items-center gap-1">
          {showFirstLast && (
            <AnimatePresence mode="wait">
              <motion.div key="first" {...animations[animation]}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1 || isLoading}
                  aria-label="First page"
                  className={buttonStyles}
                >
                  <ChevronsLeft
                    className={cn(
                      size === "sm" && "h-3 w-3",
                      size === "md" && "h-4 w-4",
                      size === "lg" && "h-5 w-5",
                    )}
                  />
                </Button>
              </motion.div>
            </AnimatePresence>
          )}

          <AnimatePresence mode="wait">
            <motion.div key="prev" {...animations[animation]}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                aria-label="Previous page"
                className={buttonStyles}
              >
                <ChevronLeft
                  className={cn(
                    size === "sm" && "h-3 w-3",
                    size === "md" && "h-4 w-4",
                    size === "lg" && "h-5 w-5",
                  )}
                />
              </Button>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-1">
            <AnimatePresence mode="wait">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <motion.span
                    key={`ellipsis-${index}`}
                    className={cn(
                      "px-2 text-muted-foreground dark:text-muted-foreground",
                      size === "sm" && "text-xs",
                      size === "md" && "text-sm",
                      size === "lg" && "text-base",
                    )}
                    {...animations[animation]}
                  >
                    ...
                  </motion.span>
                ) : (
                  <motion.div key={page} {...animations[animation]}>
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page as number)}
                      disabled={isLoading}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={cn(
                        buttonStyles,
                        "font-medium",
                        currentPage === page &&
                          cn(
                            "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 dark:hover:bg-primary/90",
                            customColors?.active,
                          ),
                      )}
                    >
                      {isLoading && currentPage === page ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        page
                      )}
                    </Button>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key="next" {...animations[animation]}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                aria-label="Next page"
                className={buttonStyles}
              >
                <ChevronRight
                  className={cn(
                    size === "sm" && "h-3 w-3",
                    size === "md" && "h-4 w-4",
                    size === "lg" && "h-5 w-5",
                  )}
                />
              </Button>
            </motion.div>
          </AnimatePresence>

          {showFirstLast && (
            <AnimatePresence mode="wait">
              <motion.div key="last" {...animations[animation]}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || isLoading}
                  aria-label="Last page"
                  className={buttonStyles}
                >
                  <ChevronsRight
                    className={cn(
                      size === "sm" && "h-3 w-3",
                      size === "md" && "h-4 w-4",
                      size === "lg" && "h-5 w-5",
                    )}
                  />
                </Button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
