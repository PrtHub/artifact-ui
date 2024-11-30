"use client";

import {
  Palette,
  Brush,
  Image as ImageIcon,
  Layout,
  Settings,
} from "lucide-react";
import { PaletteNavigation } from "@/registry/default/ui-canvas/palette-navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Color Palette",
    href: "#palette",
    description: "Customize your colors",
    icon: <Palette className="h-6 w-6" />,
    color: "from-violet-500/80 to-purple-500/80",
  },
  {
    label: "Sketch Tools",
    href: "#sketch",
    description: "Digital drawing tools",
    icon: <Brush className="h-6 w-6" />,
    color: "from-blue-500/80 to-cyan-500/80",
  },
  {
    label: "Gallery",
    href: "#gallery",
    description: "View your artwork",
    icon: <ImageIcon className="h-6 w-6" />,
    color: "from-emerald-500/80 to-green-500/80",
  },
  {
    label: "Layout",
    href: "#layout",
    description: "Arrange your canvas",
    icon: <Layout className="h-6 w-6" />,
    color: "from-orange-500/80 to-red-500/80",
  },
  {
    label: "Settings",
    href: "#settings",
    description: "Configure preferences",
    icon: <Settings className="h-6 w-6" />,
    color: "from-yellow-500/80 to-amber-500/80",
  },
];

export default function PaletteNavigationDemo() {
  const [layout, setLayout] = useState<"flex" | "circle" | "arc" | "line">(
    "flex",
  );

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-8 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8">
      <div className="z-20 flex items-center gap-2">
        <button
          onClick={() => setLayout("flex")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            layout === "flex"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80",
          )}
        >
          Flex
        </button>
        <button
          onClick={() => setLayout("circle")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            layout === "circle"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80",
          )}
        >
          Circle
        </button>
        <button
          onClick={() => setLayout("arc")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            layout === "arc"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80",
          )}
        >
          Arc
        </button>
        <button
          onClick={() => setLayout("line")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            layout === "line"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80",
          )}
        >
          Line
        </button>
      </div>

      <PaletteNavigation items={navigationItems} layout={layout} />
    </div>
  );
}
