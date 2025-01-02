"use client";

import { useState } from "react";
import GalleryFlow from "@/registry/default/xanthic/gallery-flow";

const images = [
  {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Nebula in deep space",
    caption: "A stunning nebula captured by the James Webb Space Telescope",
  },
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    alt: "Galaxy formation",
    caption: "Spiral galaxy formation in the cosmos",
  },
  {
    src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
    alt: "Northern Lights",
    caption: "Aurora Borealis dancing in the night sky",
  },
  {
    src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
    alt: "Meteor shower",
    caption: "Perseid meteor shower lighting up the atmosphere",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    alt: "Space Station",
    caption: "International Space Station orbiting Earth",
  },
];

export default function GalleryFlowDemo() {
  const [variant, setVariant] = useState<"flow" | "fade" | "slide" | "stack">(
    "flow",
  );

  return (
    <div className="z-20 mx-auto max-w-3xl space-y-8">
      <div className="flex flex-wrap gap-4 rounded-lg bg-muted p-4">
        {(["flow", "fade", "slide", "stack"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              variant === v
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted-foreground/10"
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <GalleryFlow
        images={images}
        variant={variant}
        autoPlay
        interval={5000}
        aspectRatio="square"
        thumbnailPosition="bottom"
        thumbnailSize="lg"
        className="rounded-lg border bg-card p-2 shadow-lg"
      />
    </div>
  );
}
