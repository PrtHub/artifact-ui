"use client";

import * as React from "react";
import {
  Root,
  Trigger,
  Menu,
  Group,
  Portal,
  Sub,
  RadioGroup,
  SubTrigger,
  SubContent,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  ItemIndicator,
  Arrow,
} from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";

const CanvasMenu = Root;
const CanvasMenuMenu = Menu;
const CanvasMenuTrigger = Trigger;
const CanvasMenuGroup = Group;
const CanvasMenuPortal = Portal;
const CanvasMenuSub = Sub;
const CanvasMenuRadioGroup = RadioGroup;
const CanvasMenuArrow = Arrow;

const CanvasMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger>
>(({ className, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "before:absolute before:inset-0 before:z-0 before:bg-[url('/canvas-texture.png')] before:opacity-50 before:content-['']",
      "after:absolute after:bottom-0 after:left-0 after:h-0 after:w-1 after:bg-gradient-to-b after:from-amber-500/50 after:to-transparent after:transition-[height] after:content-['']",
      "hover:after:bottom-auto hover:after:top-0 hover:after:h-full",
      "data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800",
      "hover:bg-neutral-50 dark:hover:bg-neutral-900",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <svg
      className="ml-auto h-4 w-4 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      <path
        d="M8.5 5.5L15.5 12L8.5 18.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SubTrigger>
));
CanvasMenuSubTrigger.displayName = SubTrigger.displayName;

const CanvasMenuSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 shadow-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "dark:border-neutral-800 dark:bg-neutral-950",
      className,
    )}
    {...props}
  />
));
CanvasMenuSubContent.displayName = SubContent.displayName;

const CanvasMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      align="start"
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className,
      )}
      {...props}
    >
      {props.children}
      <CanvasMenuArrow className="fill-neutral-200 dark:fill-neutral-800" />
    </Content>
  </Portal>
));
CanvasMenuContent.displayName = Content.displayName;

const CanvasMenuItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
      "before:absolute before:inset-0 before:z-0 before:bg-[url('/canvas-texture.png')] before:opacity-50 before:content-['']",
      "focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
CanvasMenuItem.displayName = Item.displayName;

const CanvasMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "before:absolute before:inset-0 before:z-0 before:bg-[url('/canvas-texture.png')] before:opacity-50 before:content-['']",
      "focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <svg
          className="h-4 w-4 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <path
            d="M20 6L9 17L4 12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));
CanvasMenuCheckboxItem.displayName = CheckboxItem.displayName;

const CanvasMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "before:absolute before:inset-0 before:z-0 before:bg-[url('/canvas-texture.png')] before:opacity-50 before:content-['']",
      "focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <svg
          className="h-2 w-2 fill-current"
          viewBox="0 0 8 8"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
CanvasMenuRadioItem.displayName = RadioItem.displayName;

const CanvasMenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
CanvasMenuLabel.displayName = Label.displayName;

const CanvasMenuSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
));
CanvasMenuSeparator.displayName = Separator.displayName;

const PaintEffects = () => (
  <svg width="0" height="0">
    <defs>
      <filter id="paint-stroke">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="3"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
      </filter>
      <filter id="paint-drip">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.03"
          numOctaves="2"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        <feGaussianBlur stdDeviation="0.3" />
      </filter>
      <filter id="paint-dot">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05"
          numOctaves="1"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
  </svg>
);

export {
  CanvasMenu,
  CanvasMenuMenu,
  CanvasMenuTrigger,
  CanvasMenuContent,
  CanvasMenuItem,
  CanvasMenuCheckboxItem,
  CanvasMenuRadioItem,
  CanvasMenuLabel,
  CanvasMenuSeparator,
  CanvasMenuGroup,
  CanvasMenuPortal,
  CanvasMenuSub,
  CanvasMenuSubContent,
  CanvasMenuSubTrigger,
  CanvasMenuRadioGroup,
  CanvasMenuArrow,
  PaintEffects,
};
