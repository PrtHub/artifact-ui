"use client";

import {
  EaselTabs,
  EaselTabsList,
  EaselTabsTrigger,
  EaselTabsContent,
} from "@/registry/default/ui/easel-tabs";

export default function EaselTabsDemo() {
  return (
    <EaselTabs defaultValue="sketch" className="z-30 mx-auto w-full max-w-3xl">
      <EaselTabsList className="w-full">
        <EaselTabsTrigger value="sketch">
          <span>Sketch</span>
        </EaselTabsTrigger>
        <EaselTabsTrigger value="gallery">
          <span>Gallery</span>
        </EaselTabsTrigger>
        <EaselTabsTrigger value="palette">
          <span>Palette</span>
        </EaselTabsTrigger>
      </EaselTabsList>

      <EaselTabsContent value="sketch" className="z-30 space-y-4">
        <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-white/5 p-8 dark:bg-zinc-950/5">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Digital Sketchpad</h3>
            <p className="text-sm text-muted-foreground">
              Create beautiful artwork with our intuitive digital sketching
              tools
            </p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-background to-muted/20 shadow-sm dark:from-zinc-900 dark:to-zinc-800/20"
              />
            ))}
          </div>
        </div>
      </EaselTabsContent>

      <EaselTabsContent value="gallery" className="space-y-4">
        <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-white/5 p-8 dark:bg-zinc-950/5">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Art Gallery</h3>
            <p className="text-sm text-muted-foreground">
              Browse and showcase your artistic creations
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-gradient-to-tr from-primary/10 via-background to-muted/10 shadow-sm dark:from-primary/20 dark:via-zinc-900 dark:to-zinc-800/10"
              />
            ))}
          </div>
        </div>
      </EaselTabsContent>

      <EaselTabsContent value="palette" className="space-y-4">
        <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-white/5 p-8 dark:bg-zinc-950/5">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Color Palette</h3>
            <p className="text-sm text-muted-foreground">
              Explore and customize your color schemes
            </p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-full bg-gradient-to-b from-primary/20 to-background/20 shadow-sm dark:from-primary/30 dark:to-zinc-900/20"
              />
            ))}
          </div>
        </div>
      </EaselTabsContent>
    </EaselTabs>
  );
}
