import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface MagneticCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  magneticStrength?: number;
  rotationStrength?: number;
  scaleOnHover?: number;
  showMagneticField?: boolean;
  fieldColor?: string;
  darkFieldColor?: string;
}

export default function MagneticCard({
  children,
  className,
  magneticStrength = 0.5,
  rotationStrength = 15,
  scaleOnHover = 1.1,
  showMagneticField = false,
  fieldColor = "rgba(147, 51, 234, 0.15)",
  darkFieldColor = "rgba(168, 85, 247, 0.25)",
  ...props
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const field = fieldRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance from mouse to card center
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Calculate magnetic pull (stronger when closer)
      const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
      const pull = Math.max(0, 1 - distance / maxDistance);

      // Calculate rotation based on mouse position
      const rotateX = (deltaY / height) * rotationStrength;
      const rotateY = -(deltaX / width) * rotationStrength;

      // Apply transform with easing
      const moveX = deltaX * pull * magneticStrength;
      const moveY = deltaY * pull * magneticStrength;

      const transform = `
        translate(${moveX}px, ${moveY}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${isHovered ? scaleOnHover : 1})
      `;

      card.style.transform = transform;
      card.style.transition = "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)";

      // Update magnetic field effect if enabled
      if (showMagneticField && field) {
        const fieldScale = 1 + pull * 0.5;
        field.style.transform = `scale(${fieldScale})`;
        field.style.opacity = (pull * 0.5).toString();
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (showMagneticField && field) {
        field.style.opacity = "0.3";
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transform = "translate(0, 0) rotateX(0) rotateY(0) scale(1)";
      if (showMagneticField && field) {
        field.style.transform = "scale(1)";
        field.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    magneticStrength,
    rotationStrength,
    scaleOnHover,
    isHovered,
    showMagneticField,
  ]);

  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      {showMagneticField && (
        <div
          ref={fieldRef}
          className="absolute inset-0 -z-10 rounded-[inherit] dark:[--mode-field-color:var(--dark-field-color)] [--dark-field-color:var(--_dark-field-color)]"
          style={
            {
              background: `radial-gradient(circle at center, var(--field-color) 0%, transparent 70%)`,
              transform: "scale(1.5)",
              opacity: 0,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              "--field-color": `var(--mode-field-color, ${fieldColor})`,
              "--_dark-field-color": darkFieldColor,
            } as React.CSSProperties
          }
        />
      )}
      <div
        ref={cardRef}
        className={cn(
          "relative rounded-lg bg-card text-card-foreground shadow-sm dark:shadow-lg dark:shadow-purple-500/5 transition-all will-change-transform",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
