"use client";

import BlobBackground from "@/registry/default/ui/blob-background";

const customBlobs = [
  {
    id: "blob1",
    gradientColors: ["#7C3AED", "#EC4899"],
    size: 450,
    blur: 70,
    speed: 12,
    opacity: 0.3,
    zIndex: 1,
    initialPosition: { x: 30, y: 30 },
    pulseScale: 1.2,
    rotationSpeed: 8,
    mouseInteractive: true,
  },
  {
    id: "blob2",
    gradientColors: ["#EC4899", "#3B82F6"],
    size: 350,
    blur: 60,
    speed: 15,
    opacity: 0.25,
    zIndex: 2,
    initialPosition: { x: 70, y: 50 },
    pulseScale: 1.15,
    rotationSpeed: 12,
    mouseInteractive: true,
  },
  {
    id: "blob3",
    gradientColors: ["#3B82F6", "#7C3AED"],
    size: 400,
    blur: 65,
    speed: 18,
    opacity: 0.2,
    zIndex: 3,
    initialPosition: { x: 50, y: 70 },
    pulseScale: 1.1,
    rotationSpeed: 10,
    mouseInteractive: true,
  },
];

export default function BlobBackgroundDemo() {
  return (
    <div className="relative z-30 h-[400px] w-full overflow-hidden rounded-lg border bg-background/50 backdrop-blur-sm">
      <BlobBackground blobs={customBlobs} />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Organic Design
          </h1>
          <p className="text-lg text-white/80">
            Attractive fluid shapes for modern interfaces
          </p>
        </div>
      </div>
    </div>
  );
}
