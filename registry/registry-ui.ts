import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "canvas-button",
    type: "registry:ui",
    dependencies: ["framer-motion", "class-variance-authority"],
    files: ["ui-canvas/canvas-button.tsx"],
    registryDependencies: [],
  },
];
