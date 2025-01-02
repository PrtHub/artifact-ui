"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ArtBoardLayoutProps {
  gridSize?: number;
  borderWidth?: "thin" | "medium" | "thick";
  borderStyle?: "modern" | "classic" | "rustic";
  backgroundColor?: string;
  gridColor?: string;
  snapToGrid?: boolean;
  minHeight?: string;
  showGridLines?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface Position {
  x: number;
  y: number;
}

interface DraggableProps {
  children: React.ReactNode;
  onPositionChange?: (position: Position) => void;
  initialPosition?: Position;
  gridSize?: number;
  snapToGrid?: boolean;
}

const Draggable = ({
  children,
  onPositionChange,
  initialPosition = { x: 0, y: 0 },
  gridSize = 20,
  snapToGrid = true,
}: DraggableProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const elementStart = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button !== 0) return; // Only left click
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      elementStart.current = position;
      e.stopPropagation();
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      let newX = elementStart.current.x + (e.clientX - dragStart.current.x);
      let newY = elementStart.current.y + (e.clientY - dragStart.current.y);

      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
      }

      const newPosition = { x: newX, y: newY };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    },
    [isDragging, gridSize, snapToGrid, onPositionChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={elementRef}
      style={{
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

const borderStyles = {
  modern: "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm",
  classic: "bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner",
  rustic: "bg-gradient-to-br from-stone-100 to-stone-200 shadow-inner",
};

const borderWidths = {
  thin: "p-4",
  medium: "p-6",
  thick: "p-8",
};

export function ArtBoardLayout({
  gridSize = 20,
  borderWidth = "medium",
  borderStyle = "modern",
  backgroundColor = "white",
  gridColor = "rgba(0, 0, 0, 0.05)",
  snapToGrid = true,
  minHeight = "400px",
  showGridLines = true,
  className,
  children,
}: ArtBoardLayoutProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!children) return;
    const childArray = React.Children.toArray(children);
    setElements(
      childArray.map((child, index) => (
        <Draggable
          key={index}
          gridSize={gridSize}
          snapToGrid={snapToGrid}
          initialPosition={{ x: index * gridSize * 2, y: gridSize * 2 }}
        >
          {child}
        </Draggable>
      )),
    );
  }, [children, gridSize, snapToGrid]);

  const gridBackground = showGridLines
    ? {
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }
    : {};

  return (
    <div
      ref={boardRef}
      className={cn(
        "relative overflow-hidden rounded-xl border transition-colors",
        "hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-primary/20",
        borderStyles[borderStyle],
        borderWidths[borderWidth],
        className,
      )}
      style={{
        minHeight,
        backgroundColor,
        ...gridBackground,
      }}
    >
      {elements}
    </div>
  );
}
