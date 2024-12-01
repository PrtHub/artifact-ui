import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "canvas-button",
    type: "registry:ui",
    dependencies: ["framer-motion", "class-variance-authority"],
    files: ["ui-canvas/canvas-button.tsx"],
    registryDependencies: [],
  },
  {
    name: "color-palette",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    files: ["ui-canvas/color-palette.tsx"],
  },
  {
    name: "sketch-input",
    type: "registry:ui",
    dependencies: ["framer-motion", "class-variance-authority"],
    files: ["ui-canvas/sketch-input.tsx"],
    registryDependencies: [],
  },
  {
    name: "gallery-grid",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["ui-canvas/gallery-grid.tsx"],
  },
  {
    name: "easel-tabs",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-tabs", "framer-motion"],
    files: ["ui-canvas/easel-tabs.tsx"],
  },
  {
    name: "palette-navigation",
    type: "registry:ui",
    dependencies: ["framer-motion", "lucide-react"],
    files: ["ui-canvas/palette-navigation.tsx"],
  },
  {
    name: "canvas-modal",
    type: "registry:ui",
    dependencies: ["framer-motion", "@radix-ui/react-dialog", "lucide-react"],
    files: ["ui-canvas/canvas-modal.tsx"],
  },
  {
    name: "brush-stroke-loader",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["ui-canvas/brush-stroke-loader.tsx"],
  },
  {
    name: "art-board-layout",
    type: "registry:ui",
    dependencies: ["@dnd-kit/core"],
    files: ["ui-canvas/art-board-layout.tsx"],
  },
  {
    name: "palette-toast",
    type: "registry:ui",
    dependencies: [],
    files: ["ui-canvas/palette-toast.tsx"],
    registryDependencies: [],
  },
  {
    name: "canvas-drawer",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["ui-canvas/canvas-drawer.tsx"],
  },
  {
    name: "painterly-select",
    type: "registry:ui",
    dependencies: ["framer-motion", "@radix-ui/react-select", "lucide-react"],
    files: ["ui-canvas/painterly-select.tsx"],
  },
  {
    name: "texture-overlay",
    type: "registry:ui",
    dependencies: [],
    files: ["ui-canvas/texture-overlay.tsx"],
  },
];
