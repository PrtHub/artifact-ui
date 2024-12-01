"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const PainterlySelect = SelectPrimitive.Root;

const PainterlySelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, placeholder = "Select an option", ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    placeholder={placeholder}
    className={cn(
      "text-sm font-medium",
      "data-[placeholder]:text-muted-foreground",
      "dark:text-neutral-200 dark:data-[placeholder]:text-neutral-400",
      className,
    )}
    {...props}
  />
));
PainterlySelectValue.displayName = SelectPrimitive.Value.displayName;

const PainterlySelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group relative flex h-11 w-full items-center justify-between gap-2 rounded-lg bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      // Paint drip effect - Light mode
      "before:absolute before:inset-x-0 before:bottom-0 before:h-[120%] before:origin-bottom before:scale-y-0 before:bg-gradient-to-t before:from-primary/10 before:to-transparent before:transition-transform before:duration-500 before:ease-out group-hover:before:scale-y-100",
      // Border effect - Light mode
      "after:absolute after:inset-0 after:rounded-lg after:border after:border-input after:transition-colors after:duration-300 group-hover:after:border-primary/50",
      // Dark mode specific styles
      "dark:bg-neutral-900",
      "dark:before:from-primary/20",
      "dark:after:border-neutral-700 dark:group-hover:after:border-primary/60",
      className,
    )}
    {...props}
  >
    <motion.div
      className="relative flex flex-1 items-center"
      initial={false}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
    <motion.div
      className="relative flex items-center"
      initial={false}
      animate={{ rotate: props["data-state"] === "open" ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
    >
      <ChevronDown className="h-4 w-4 shrink-0 opacity-50 transition-colors group-hover:opacity-100 dark:opacity-40 dark:group-hover:opacity-90" />
    </motion.div>
  </SelectPrimitive.Trigger>
));
PainterlySelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const PainterlySelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <AnimatePresence>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md",
          "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="max-h-[300px] overflow-auto p-1">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-popover to-transparent dark:from-neutral-900" />
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-popover to-transparent dark:from-neutral-900" />
          </div>
        </motion.div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </AnimatePresence>
));
PainterlySelectContent.displayName = SelectPrimitive.Content.displayName;

const PainterlySelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "group relative flex h-9 cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Paint splash effect on hover - Light mode
      "before:absolute before:inset-0 before:-z-10 before:origin-center before:scale-0 before:rounded-full before:bg-primary/10 before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-100",
      // Paint drip effect when selected - Light mode
      "after:absolute after:inset-0 after:-z-20 after:origin-top after:scale-y-0 after:bg-gradient-to-b after:from-primary/20 after:to-transparent after:transition-transform after:duration-500 data-[state=checked]:after:scale-y-100",
      // Selected state - Light mode
      "data-[state=checked]:font-medium data-[state=checked]:text-primary",
      // Dark mode
      "dark:text-neutral-200",
      "dark:before:bg-primary/20",
      "dark:after:from-primary/30",
      "dark:group-hover:text-white dark:data-[state=checked]:text-primary",
      className,
    )}
    {...props}
  >
    <motion.span
      className="relative"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  </SelectPrimitive.Item>
));
PainterlySelectItem.displayName = SelectPrimitive.Item.displayName;

const PainterlySelectGroup = SelectPrimitive.Group;

const PainterlySelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "relative px-3 py-2 text-sm font-semibold text-muted-foreground",
      "dark:text-neutral-400",
      // Artistic underline effect
      "after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-muted-foreground/30 after:to-transparent dark:after:via-neutral-500/30",
      className,
    )}
    {...props}
  />
));
PainterlySelectLabel.displayName = SelectPrimitive.Label.displayName;

const PainterlySelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent transition-colors dark:via-neutral-600/50",
      className,
    )}
    {...props}
  />
));
PainterlySelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  PainterlySelect,
  PainterlySelectGroup,
  PainterlySelectValue,
  PainterlySelectTrigger,
  PainterlySelectContent,
  PainterlySelectLabel,
  PainterlySelectItem,
  PainterlySelectSeparator,
};
