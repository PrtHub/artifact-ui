import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface StarfallProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  speed?: number;
  variant?:
    | "cosmic"
    | "aurora"
    | "minimal"
    | "gradient"
    | "neon"
    | "sunset"
    | "ocean"
    | "forest";
  showBackground?: boolean;
  backgroundStars?: number;
  backgroundOpacity?: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  sparkRadius: number;
}

const VARIANT_COLORS = {
  cosmic: [
    "#FFD700",
    "#FF69B4",
    "#00FFFF",
    "#FF4500",
    "#7FFF00",
    "#FF1493",
    "#00FF7F",
    "#FF00FF",
    "#1E90FF",
    "#32CD32",
  ],
  aurora: [
    "#80FFB2",
    "#40E0D0",
    "#48D1CC",
    "#7FFFD4",
    "#98FF98",
    "#90EE90",
    "#00FA9A",
    "#00FF7F",
    "#98FB98",
    "#7CCD7C",
  ],
  minimal: [
    "#FFFFFF",
    "#F8F8FF",
    "#F5F5F5",
    "#FFFAFA",
    "#F0F8FF",
    "#F0FFFF",
    "#F5FFFA",
    "#FFF5EE",
    "#FFFAF0",
    "#F0FFF0",
  ],
  gradient: [
    "#FF6B6B",
    "#FF8E8E",
    "#FFA4A4",
    "#FFB1B1",
    "#FFCBCB",
    "#4ECDC4",
    "#45B7AF",
    "#3CA29A",
    "#338D86",
    "#2A7871",
  ],
  neon: [
    "#FF1177",
    "#FF0A54",
    "#FF0055",
    "#FF004D",
    "#FF0033",
    "#FF00FF",
    "#FF1493",
    "#FF69B4",
    "#FFB6C1",
    "#FF00FF",
  ],
  sunset: [
    "#FF7E5F",
    "#FEB47B",
    "#FF9966",
    "#FF8C42",
    "#FFA07A",
    "#FFB6C1",
    "#FF9999",
    "#FFAE42",
    "#FF8243",
    "#FFA500",
  ],
  ocean: [
    "#00FFFF",
    "#1E90FF",
    "#00CED1",
    "#20B2AA",
    "#48D1CC",
    "#40E0D0",
    "#7FFFD4",
    "#5F9EA0",
    "#4682B4",
    "#87CEEB",
  ],
  forest: [
    "#90EE90",
    "#98FB98",
    "#32CD32",
    "#3CB371",
    "#2E8B57",
    "#00FA9A",
    "#00FF7F",
    "#7CCD7C",
    "#98FB98",
    "#7FFF00",
  ],
};

const VARIANT_STYLES = {
  cosmic: {
    background:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-[#000B2E] to-black",
    starTrailOpacity: 0.7,
    starHeight: 12,
    sparkOpacity: 0.2,
  },
  aurora: {
    background: "bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950",
    starTrailOpacity: 0.5,
    starHeight: 15,
    sparkOpacity: 0.15,
  },
  minimal: {
    background: "bg-slate-950",
    starTrailOpacity: 0.3,
    starHeight: 8,
    sparkOpacity: 0.1,
  },
  gradient: {
    background: "bg-gradient-to-br from-rose-950 via-purple-950 to-indigo-950",
    starTrailOpacity: 0.6,
    starHeight: 10,
    sparkOpacity: 0.25,
  },
  neon: {
    background: "bg-black",
    starTrailOpacity: 0.8,
    starHeight: 14,
    sparkOpacity: 0.3,
  },
  sunset: {
    background: "bg-gradient-to-b from-orange-950 via-rose-950 to-purple-950",
    starTrailOpacity: 0.6,
    starHeight: 12,
    sparkOpacity: 0.25,
  },
  ocean: {
    background: "bg-gradient-to-b from-sky-950 via-blue-950 to-indigo-950",
    starTrailOpacity: 0.5,
    starHeight: 10,
    sparkOpacity: 0.2,
  },
  forest: {
    background: "bg-gradient-to-b from-green-950 via-emerald-950 to-teal-950",
    starTrailOpacity: 0.5,
    starHeight: 11,
    sparkOpacity: 0.2,
  },
};

export default function Starfall({
  count = 25,
  speed = 1,
  variant = "cosmic",
  showBackground = true,
  backgroundStars = 30,
  backgroundOpacity = 0.3,
  className,
  ...props
}: StarfallProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const variantStyle = VARIANT_STYLES[variant];
  const colors = VARIANT_COLORS[variant];

  const createStar = useCallback(
    (index: number, yPos?: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: index,
        x: Math.random() * 100,
        y: yPos ?? -(Math.random() * 100),
        size: Math.random() * 3 + 2,
        speed: (Math.random() * 0.5 + 0.75) * speed,
        color,
        sparkRadius: Math.random() * 50 + 30,
      };
    },
    [speed, colors],
  );

  useEffect(() => {
    const initialStars = Array.from({ length: count }, (_, i) =>
      createStar(i, -(Math.random() * 100)),
    );
    setStars(initialStars);
  }, [count, createStar]);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-lg",
        showBackground && variantStyle.background,
        className,
      )}
      {...props}
    >
      {variant === "aurora" && showBackground && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-aurora-shift bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent blur-2xl" />
          <div className="absolute inset-0 animate-aurora-shift-alt bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-2xl" />
        </div>
      )}

      {showBackground && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,rgba(25,44,100,0.3)_0,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 animate-nebula-shift bg-gradient-to-br from-purple-500/5 via-transparent to-transparent blur-xl" />
            <div className="absolute inset-0 animate-nebula-shift-reverse bg-gradient-to-tl from-blue-500/5 via-transparent to-transparent blur-xl" />
          </div>
          <div className="absolute inset-0">
            {Array.from({ length: backgroundStars }).map((_, i) => {
              const size = Math.random() * 2 + 1;
              return (
                <div
                  key={i}
                  className="absolute animate-twinkle rounded-full bg-white"
                  style={{
                    width: size,
                    height: size,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * backgroundOpacity + 0.1,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 2 + 2}s`,
                  }}
                />
              );
            })}
          </div>
        </>
      )}

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-continuous-fall"
          style={
            {
              "--fall-duration": `${15 / star.speed}s`,
              "--star-x": `${star.x}%`,
              left: "var(--star-x)",
              width: star.size,
              height: star.size * variantStyle.starHeight,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 animate-pulse"
            style={{
              width: star.sparkRadius,
              height: star.sparkRadius,
              background: `radial-gradient(circle, ${star.color}${Math.floor(variantStyle.sparkOpacity * 255).toString(16)} 0%, transparent 70%)`,
              filter: variant === "neon" ? "blur(2px)" : "blur(1px)",
            }}
          />
          <div
            className="absolute h-full w-full"
            style={{
              background: `linear-gradient(to bottom, ${star.color}, transparent)`,
              filter: variant === "neon" ? "blur(2px)" : "blur(0.5px)",
              opacity: variantStyle.starTrailOpacity,
            }}
          />
          <div
            className="absolute h-[3px] w-full animate-pulse"
            style={{
              background: star.color,
              boxShadow:
                variant === "neon"
                  ? `0 0 20px ${star.color}`
                  : `0 0 10px ${star.color}`,
              filter: variant === "neon" ? "blur(2px)" : "blur(0.5px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
