"use client";

import { useState } from "react";
import ArtCanvasCard from "@/registry/default/ui-canvas/collapsible-card";
import { Sparkles, Star } from "lucide-react";

export default function ArtCanvasCardDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative z-30 mx-auto max-w-2xl">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -inset-40 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl dark:from-violet-600/10 dark:via-fuchsia-600/10 dark:to-cyan-600/10" />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 blur-3xl dark:from-cyan-600/5 dark:via-violet-600/5 dark:to-fuchsia-600/5" />
      </div>

      {/* Showcase Card */}
      <ArtCanvasCard
        title="Interactive Universe"
        icon={Sparkles}
        variant="neon"
        interactive
        glowColor="#8b5cf6"
        particleCount={100}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className="backdrop-blur-sm"
        preview={
          <div className="relative aspect-video w-full overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 dark:from-violet-700 dark:via-fuchsia-700 dark:to-cyan-700">
              {/* Animated Stars */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-twinkle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                >
                  <Star
                    className="h-3 w-3 text-white/80"
                    fill="white"
                    strokeWidth={0}
                  />
                </div>
              ))}

              {/* Central Orb */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-20 animate-pulse bg-white/20 blur-2xl" />
                  <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-white via-violet-200 to-fuchsia-200 shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/20" />
                    {/* Orbiting Elements */}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 animate-orbit"
                        style={{
                          animationDelay: `${i * -3}s`,
                        }}
                      >
                        <div
                          className="absolute h-4 w-4 rounded-full bg-white shadow-lg"
                          style={{
                            top: `${Math.sin((i * 2 * Math.PI) / 3) * 100 + 50}%`,
                            left: `${Math.cos((i * 2 * Math.PI) / 3) * 100 + 50}%`,
                          }}
                        >
                          <div className="absolute -inset-1 animate-pulse bg-white blur-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <p className="text-base/relaxed">
            Experience an interactive cosmic journey where particles dance
            through space, stars twinkle in the distance, and celestial bodies
            orbit in perfect harmony. This showcase demonstrates the Art Canvas
            Card&apos;s ability to create immersive, animated experiences.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "3D Interaction",
                desc: "Move your cursor to explore the depth",
              },
              {
                title: "Particle Effects",
                desc: "Watch the cosmic dust flow",
              },
              {
                title: "Orbital Motion",
                desc: "Smooth celestial animations",
              },
              {
                title: "Dynamic Lighting",
                desc: "Responsive to dark/light modes",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg bg-white/5 p-4 backdrop-blur-sm"
              >
                <h4 className="font-semibold text-white/90">{feature.title}</h4>
                <p className="mt-1 text-sm text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Elements */}
          <div className="flex items-center justify-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="group relative h-3 w-3">
                <div className="absolute -inset-3 animate-ping rounded-full bg-white/30 [animation-duration:3s] [animation-iteration-count:infinite]" />
                <div className="absolute -inset-2 rounded-full bg-white/20 blur-sm transition-all duration-500 group-hover:bg-white/40" />
                <div className="relative h-full w-full rounded-full bg-white transition-transform duration-500 group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </ArtCanvasCard>
    </div>
  );
}
