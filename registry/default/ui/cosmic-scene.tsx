import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CosmicSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  colorScheme?: "default" | "neon" | "sunset" | "ocean";
  interactive?: boolean;
  children?: React.ReactNode;
  overlayOpacity?: number;
}

export default function CosmicScene({
  className,
  size = "20px",
  colorScheme = "default",
  interactive = true,
  children,
  overlayOpacity = 0,
  ...props
}: CosmicSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const colorSchemes = {
    default:
      "from 180deg at 50% 70%, hsla(0,0%,98%,1) 0deg, #eec32d 72deg, #ec4b4b 144deg, #709ab9 216deg, #4dffbf 288deg, hsla(0,0%,98%,1) 1turn",
    neon: "from 180deg at 50% 70%, #ff00ff 0deg, #00ffff 120deg, #ffff00 240deg, #ff00ff 360deg",
    sunset:
      "from 180deg at 50% 70%, #ff7b00 0deg, #ff0055 120deg, #8900ff 240deg, #ff7b00 360deg",
    ocean:
      "from 180deg at 50% 70%, #00fff2 0deg, #0066ff 120deg, #002bff 240deg, #00fff2 360deg",
  };

  useEffect(() => {
    if (!interactive || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden bg-[hsl(0_0%_6%)]",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 h-full w-full animate-flicker transition-transform duration-300 ease-out"
        style={{
          background: `conic-gradient(${colorSchemes[colorScheme]})`,
          transform: interactive
            ? `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.02
              }deg) rotateY(${(mousePosition.x - 50) * 0.02}deg)`
            : undefined,
          WebkitMaskImage: `radial-gradient(circle at ${
            interactive ? `${mousePosition.x}% ${mousePosition.y}%` : "50% 50%"
          }, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          WebkitMaskSize: `${size} ${size}, 256px 256px`,
          WebkitMaskPosition: "50% 50%, 4px 50%",
          WebkitMaskComposite: "intersect",
          maskImage: `radial-gradient(circle at ${
            interactive ? `${mousePosition.x}% ${mousePosition.y}%` : "50% 50%"
          }, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          maskSize: `${size} ${size}, 256px 256px`,
          maskPosition: "50% 50%, 4px 50%",
          maskComposite: "intersect",
        }}
      />
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
}
