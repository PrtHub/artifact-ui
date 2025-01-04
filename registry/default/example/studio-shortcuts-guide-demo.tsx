"use client";

import StudioShortcutsGuide from "@/registry/default/ui/studio-shortcuts-guide";

const customShortcuts = {
  canvas: [
    { keys: ["Space"], description: "Pan canvas" },
    { keys: ["Ctrl", "+"], description: "Zoom in" },
    { keys: ["Ctrl", "-"], description: "Zoom out" },
    { keys: ["Ctrl", "0"], description: "Reset zoom" },
    { keys: ["R"], description: "Rotate canvas" },
    { keys: ["F"], description: "Toggle fullscreen" },
  ],
  layers: [
    { keys: ["Ctrl", "J"], description: "Duplicate layer" },
    { keys: ["Ctrl", "G"], description: "Group layers" },
    { keys: ["["], description: "Lower layer opacity" },
    { keys: ["]"], description: "Increase layer opacity" },
    { keys: ["Ctrl", "Shift", "N"], description: "New layer" },
    { keys: ["Ctrl", "Shift", "E"], description: "Merge layers" },
  ],
};

export default function StudioShortcutsGuideDemo() {
  return (
    <div className="relative flex min-h-[600px] items-center justify-center bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 2xl:p-8">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-30 blur-2xl" />
        <div className="relative space-y-8">
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
              With Custom Shortcuts
            </h3>
            <StudioShortcutsGuide
              className="w-full min-w-[500px] 2xl:min-w-[600px]"
              shortcuts={customShortcuts}
            />
          </div>
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Custom Shortcuts Only
            </h3>
            <StudioShortcutsGuide
              className="w-full min-w-[500px] 2xl:min-w-[600px]"
              shortcuts={customShortcuts}
              customOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
