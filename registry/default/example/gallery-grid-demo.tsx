"use client";

import Image from "next/image";
import { useState } from "react";

import {
  GalleryGrid,
  GalleryItem,
} from "@/registry/default/xanthic/gallery-grid";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "https://images.unsplash.com/photo-1732120710779-0e16f4f47b6f",
    alt: "Abstract Art",
    aspectRatio: "landscape" as const,
    title: "Abstract Harmony",
    description: "A vibrant exploration of color and form",
  },
  {
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968",
    alt: "Digital Art",
    aspectRatio: "portrait" as const,
    title: "Digital Dreams",
    description: "Where technology meets creativity",
  },
  {
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5",
    alt: "Modern Art",
    aspectRatio: "square" as const,
    title: "Modern Expression",
    description: "Contemporary artistic vision",
  },
  {
    src: "https://images.unsplash.com/photo-1732624697703-c5b0d3110cb4",
    alt: "Artistic Photography",
    aspectRatio: "video" as const,
    title: "Captured Moment",
    description: "Photography as fine art",
  },
];

export default function GalleryGridDemo() {
  const [hoverEffect, setHoverEffect] = useState<
    "zoom" | "lift" | "tilt" | "none"
  >("tilt");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Hover Effect:</span>
        {(["zoom", "lift", "tilt", "none"] as const).map((effect) => (
          <button
            key={effect}
            onClick={() => setHoverEffect(effect)}
            className={cn(
              "z-20 cursor-pointer rounded-md px-3 py-1 text-sm transition-colors",
              hoverEffect === effect
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80",
            )}
          >
            {effect.charAt(0).toUpperCase() + effect.slice(1)}
          </button>
        ))}
      </div>

      <GalleryGrid columns={2} gap={6} hover={hoverEffect}>
        {images.map((image, index) => (
          <GalleryItem key={index} aspectRatio={image.aspectRatio}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="relative z-10 space-y-2">
              <h3 className="text-lg font-semibold text-white">
                {image.title}
              </h3>
              <p className="text-sm text-white/80">{image.description}</p>
            </div>
          </GalleryItem>
        ))}
      </GalleryGrid>
    </div>
  );
}
