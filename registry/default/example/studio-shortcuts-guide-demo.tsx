"use client";

import StudioShortcutsGuide from "@/registry/default/ui-canvas/studio-shortcuts-guide";

const customShortcuts = {
  typescript: [
    { keys: ["Ctrl", "Space"], description: "Trigger suggestions" },
    { keys: ["Ctrl", "."], description: "Quick fixes" },
    { keys: ["F12"], description: "Go to definition" },
    { keys: ["Alt", "F12"], description: "Peek definition" },
  ],
  tools: [
    { keys: ["T"], description: "Text tool" },
    { keys: ["G"], description: "Gradient tool" },
  ],
};

export default function StudioShortcutsGuideDemo() {
  return (
    <div className="relative flex min-h-[600px] items-center justify-center bg-background/95 p-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-30 blur-2xl" />
        <div className="relative space-y-8">
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">With Custom Shortcuts</h3>
            <StudioShortcutsGuide
              className="w-[600px]"
              shortcuts={customShortcuts}
            />
          </div>
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">Custom Shortcuts Only</h3>
            <StudioShortcutsGuide
              className="w-[600px]"
              shortcuts={customShortcuts}
              customOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
