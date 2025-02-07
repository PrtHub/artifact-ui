import React from "react";
import SpotlightCard from "@/registry/default/ui/spotlight-card";
import { Sparkles, Zap, Palette, Code } from "lucide-react";

export default function SpotlightCardDemo() {
  return (
    <div className="grid gap-10 py-20 md:grid-cols-2">
      <SpotlightCard className="h-[250px] p-8 transition-all">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Basic Spotlight</h3>
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Default Configuration
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground">
              Experience the elegant spotlight effect that smoothly follows your
              cursor movement, creating an engaging interactive element that
              brings your UI to life.
            </p>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        className="h-[250px] p-8 transition-all"
        multiSpotlight
        glowEffect
        gradientColor="rgb(99, 102, 241)"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3">
              <Zap className="h-8 w-8 text-indigo-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Multi-spotlight with Glow</h3>
              <div className="inline-flex items-center rounded-lg bg-indigo-500/10 px-3 py-1 text-sm text-indigo-500">
                Enhanced Effects
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground">
              Dual spotlight effect combined with a subtle glow creates depth
              and dimension, making your interface more dynamic and visually
              appealing.
            </p>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        className="h-[250px] p-8 transition-all"
        spotlightBlur
        animated
        glowEffect
        spotlightSize={300}
        spotlightOpacity={0.2}
        glowSize={200}
        glowOpacity={0.3}
        gradientColor="rgb(244, 63, 94)"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-rose-500/10 p-3">
              <Palette className="h-8 w-8 text-rose-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Animated Spotlight</h3>
              <div className="inline-flex items-center rounded-lg bg-rose-500/10 px-3 py-1 text-sm text-rose-500">
                Interactive Animation
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground">
              Watch as the spotlight comes alive with smooth animations,
              creating an immersive experience that responds to user interaction
              in real-time.
            </p>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        className="h-[250px] p-8 transition-all"
        spotlightSize={300}
        spotlightOpacity={0.2}
        glowEffect
        glowSize={150}
        glowOpacity={0.2}
        gradientColor="rgb(34, 197, 94)"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-500/10 p-3">
              <Code className="h-8 w-8 text-green-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Custom Configuration</h3>
              <div className="inline-flex items-center rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">
                Advanced Settings
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground">
              Fully customizable spotlight with precise control over size,
              opacity, and glow effects to match your design requirements
              perfectly.
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
