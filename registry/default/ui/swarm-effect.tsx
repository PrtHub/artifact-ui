"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";

export interface ParticleImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  particleSize?: number;
  particleSpacing?: number;
  particleColor?: string;
  displacementRadius?: number;
  hoverEffect?: "scatter" | "gather" | "none";
  className?: string;
}

export default function SwarmEffect({
  src,
  particleSize = 2,
  particleSpacing = 4,
  particleColor = "hsl(280, 100%, 60%)",
  displacementRadius = 50,
  hoverEffect = "scatter",
  className,
  ...props
}: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; originX: number; originY: number }>
  >([]);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const frameRef = useRef<number>();
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = typeof src === "string" ? src : src.src;
    imageRef.current = image;

    image.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const containerWidth = canvas.clientWidth;
      const containerHeight =
        canvas.clientHeight || (containerWidth * image.height) / image.width;

      canvas.width = containerWidth;
      canvas.height = containerHeight;

      tempCanvas.width = containerWidth;
      tempCanvas.height = containerHeight;
      tempCtx.drawImage(image, 0, 0, containerWidth, containerHeight);

      const imageData = tempCtx.getImageData(
        0,
        0,
        containerWidth,
        containerHeight,
      );
      const particles: Array<{
        x: number;
        y: number;
        originX: number;
        originY: number;
      }> = [];

      for (let y = 0; y < containerHeight; y += particleSpacing) {
        for (let x = 0; x < containerWidth; x += particleSpacing) {
          const i = (y * containerWidth + x) * 4;
          const alpha = imageData.data[i + 3];
          const brightness =
            (imageData.data[i] +
              imageData.data[i + 1] +
              imageData.data[i + 2]) /
            3;
          if (alpha > 128 && brightness > 20) {
            particles.push({
              x,
              y,
              originX: x,
              originY: y,
            });
          }
        }
      }

      setParticles(particles);
    };

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [src, particleSpacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !particles.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;

      particles.forEach((particle) => {
        let dx = 0;
        let dy = 0;

        if (mousePosition && hoverEffect !== "none") {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - particle.x, 2) +
              Math.pow(mousePosition.y - particle.y, 2),
          );

          if (distance < displacementRadius) {
            const force = (displacementRadius - distance) / displacementRadius;
            if (hoverEffect === "scatter") {
              dx = (particle.x - mousePosition.x) * force;
              dy = (particle.y - mousePosition.y) * force;
            } else {
              dx = (mousePosition.x - particle.x) * force;
              dy = (mousePosition.y - particle.y) * force;
            }
          }
        }

        const targetX = particle.originX + dx;
        const targetY = particle.originY + dy;

        particle.x += (targetX - particle.x) * 0.1;
        particle.y += (targetY - particle.y) * 0.1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) * canvas.width) / rect.width,
        y: ((e.clientY - rect.top) * canvas.height) / rect.height,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    particles,
    particleSize,
    particleColor,
    displacementRadius,
    hoverEffect,
    mousePosition,
  ]);

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="h-full w-full max-w-full"
        style={{ opacity: particles.length ? 1 : 0 }}
      />
      <img
        src={typeof src === "string" ? src : src.src}
        alt=""
        className="absolute left-0 top-0 h-full w-full opacity-0"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
}
